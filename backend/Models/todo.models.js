import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        id:{
            type:Number,
            required:true,
            unique:true,
        },
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