


import connectDB from "@/app/lib/MongoDB";
import DATA from "@/app/models/model";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials
                await connectDB()
                const keys = await DATA.find({key:password})
                if(keys.length){
                    return null;
                }
                await DATA.create({
                    email,
                    key:password
                })
                return key;
            }
        })
    ],
    secret: process.env.NEXT_SECRET,
    pages: {
        signIn: "/"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXT_SECRET,
    jwt: {
        secret: process.env.NEXT_SECRET,
        encryption: true,
        maxAge: 30 * 24 * 60 * 60,
        issuer: "todo",
        audience: "todo",
        algorithm: "HS256",
        credentialsRequired: false,
        credentialsOptional: false,
        sessionRequired: false,
        sessionOptional: false,
    },
    
}

const handler = NextAuth(authOption)


export {handler as GET ,handler as POST}

