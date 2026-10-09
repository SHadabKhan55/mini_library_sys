import mongoose from "mongoose";

async function dbconn() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connect successfull")
    } catch (error) {
        console.log(error.message)
        
    }
}

export default dbconn