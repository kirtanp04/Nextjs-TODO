"use server"
import { default as connectDB } from "../lib/MongoDB"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import DATA from "../models/model"
import TODO from "../models/todo"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"


connectDB()
const date = new Date()
const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()



export const AddTodo = async(title,task)=>{
    const token =  cookies().get('next_auth_ticket')
    const verify =  jwt.verify(token.value,process.env.JWT_SECRET)
    const user = await DATA.findOne({_id:verify._id})
    const findKey = await TODO.findOne({key:user.key})
    const todos = {
        title,
        task,
        date:`${day} / ${month} / ${year}`,
        status:"pending"
    }
    if(findKey){
        await TODO.updateOne({key:user.key},{
            $set:{
                todo:[...findKey.todo,todos]
            }
        })
    }else{
        await TODO.create({
            key:user.key,
            todo:todos
            
        })
    }
    revalidatePath('/todo')
    revalidateTag('todo')
    return true
}




export const updateTodo =async(data,id)=>{
    const {title,task,status} = data
    const token =  cookies().get('next_auth_ticket')
    const verify =  jwt.verify(token.value,process.env.JWT_SECRET)
    const user = await DATA.findOne({_id:verify._id})
    const findKey = await TODO.findOne({key:user.key})
    const todo = findKey.todo.filter((item,index)=>index === id)[0]
    const updatedTodo = {
        title:title === "" ? todo.title : title,
        task:task === "" ? todo.task : task,
        date:`${day} / ${month} / ${year}`,
        status:status === "" ? todo.status : status
    }
    await TODO.updateOne({key:user.key},{
        $set:{
            todo:[...findKey.todo.filter((item,index)=>index !== id),updatedTodo]
        }
    })
    return true;
}



export const deleteTodo =async(id)=>{
    const token =  cookies().get('next_auth_ticket')
    const verify =  jwt.verify(token.value,process.env.JWT_SECRET)
    const user = await DATA.findOne({_id:verify._id})
    const findKey = await TODO.findOne({key:user.key})
    await TODO.updateOne({key:user.key},{
        $set:{
            todo:findKey.todo.filter((item,index)=>index !== id)
        }
    })
    return true
}

export const logOut = async()=>{
    // const request = NextRequest
    cookies().delete('next_auth_ticket')
    return true
}



