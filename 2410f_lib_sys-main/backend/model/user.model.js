import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is require"],
        trim:true
    },
    email:{
        type:String,        
        required:[true,"email is require"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is require"],
        trim:true
    },
    role:{
        type:String,
        enum:["student","librarian"],
        default:"student"
        
    },
    isApproved:{
        type:Boolean,
        default:false
    },

},{
    timestamps:true,
    versionKey:false
})

const User = mongoose.model("users",schema)

export default User