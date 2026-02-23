import clientPromise from "@/app/lib/mongoClient";
import { NextRequest,NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { error } from "console";
import { refresh, revalidatePath } from "next/cache";

export async function POST(request:NextRequest) {
    try{
        const {email , password} = await request.json()
        console.log({email , password})

        const client = await clientPromise
        const collection = await client.db(process.env.DB_NAME).collection('users')

        const user = await collection.findOne({email:email})
        console.log(user)

        if(!user){
            return NextResponse.json({error:'такого пользователя нету'})
        }

        const b = await bcrypt.compare(password , user.password)

        if(b){
            const payload = {
                id:user._id.toString(),
                name:user.name
            }
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);

            const Token = await new SignJWT(payload)
                .setProtectedHeader({alg:'HS256'})  //тип шифрования
                .setExpirationTime('2h')
                .sign(secret)
            
            const cookie_store = await cookies()

            cookie_store.set('token', Token , {
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 2,
                path:'/'
            })
            return NextResponse.json({message:'успешно'})
        }else{
            return NextResponse.json({error:'пароль неверен'})
        }

        return NextResponse.json({name:'stas'})
    } catch(err){
        console.log(err)
        return NextResponse.json({error:'ошибка сервера'})
    }   
}