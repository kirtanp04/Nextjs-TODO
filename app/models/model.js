import mongoose from "mongoose";

const modalSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const DATA = mongoose.models.DATA || mongoose.model("DATA", modalSchema) 
export default DATA
