import mongoose from "mongoose"

const DocSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    extractedText:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Doc=mongoose.model("Doc",DocSchema)
export default Doc