
"use server"

import { default as connectDB } from "../lib/MongoDB"
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import DATA from "../models/model"
connectDB()
export const Login = async(key) =>{  
    const getKey = await DATA.findOne({key})
    if(getKey){
        const token = await jwt.sign({_id:getKey._id},process.env.JWT_SECRET)
        cookies().set('next_auth_ticket',token,{httpOnly:true,path:"/",sameSite:"strict",secure:true})
        return getKey
    }else{
        return null
    }
}