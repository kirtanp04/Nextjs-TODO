import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import DATA from "@/app/models/model";
import TODO from "@/app/models/todo";
import connectDB from "@/app/lib/MongoDB";
import { NextResponse } from "next/server";

export async function GET(req){
    connectDB()
    const token =  cookies().get('next_auth_ticket')
    const verify =  jwt.verify(token.value,process.env.JWT_SECRET)
    const user = await DATA.findOne({_id:verify._id})
    const findKey = await TODO.findOne({key:user.key})
    // console.log(findKey)
    return NextResponse.json({data:findKey},{status:200})
}