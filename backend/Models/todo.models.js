import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        
        newTask:{
            type:String,
            required:true,
        },
        newDate:{
            type:Date,
            required:true
        },
        isCompleted:{
            type:Boolean,
            required:true
        }

    }
)

export const Todo = mongoose.model("Todo",todoSchema)