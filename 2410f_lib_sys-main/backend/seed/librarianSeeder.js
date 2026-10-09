import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"


async function createLibrarian() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        await User.deleteMany({
            role:"librarian"
        })

        const hashPassword = await bcrypt.hash("123",10)

        await User.create({
            name:"library admin",
            email:"librarian@123",
            password:hashPassword,
            role:"librarian",
            isApproved:true

        })
        console.log("librarian create successfull")
        process.exit(0)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }
}

createLibrarian()