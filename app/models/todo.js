import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    key:{
        type:String,
    },
    todo:{
        type:Array
    }
   
},{
    timestamps:true
})

const TODO = mongoose.models.TODO || mongoose.model("TODO", todoSchema) 
export default TODO
