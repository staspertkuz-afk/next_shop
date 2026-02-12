'use server'

import { API } from "@/global/API"
import { cookies } from 'next/headers'

function Filter(DATA:DataServer[], user:string){
    let i = true
    DATA.forEach((item)=>{
        if(item.username === user){
            i = false
        }
    })
    console.log(i);
    return i
}

export async function createAkk(data:Data) {
    try{
        const data2 = await fetch(API.users)
        const data3:DataServer[] = await data2.json()

        if(!Filter( data3, data.users.trim() )){
            return {
                ok:'error',
                data:'такое имя пользователя уже существует',
            }
        }

        const response = await fetch(API.users,{
            method:'POST',
            body:JSON.stringify({
                username:data.users.trim(),
                password:data.password.trim(),
                email:data.email.trim(),
            }),
            headers:{'Content-Type':'application/json'}
        })

        if(!response.ok){
            console.log('прошло')
            return {
                ok:'error',
                data:undefined,
            }
        }

        const coocie = await cookies()
        coocie.set('token', data.email.trim(), {
            httpOnly:true,
            sameSite:'strict',
            maxAge:60*60*24*30,
            path:'/'
        })

        return {
            ok:'ok',
            data:'ddssd',
        }
    }catch{
        return {
            ok:'error',
            data:undefined,
        }
    }
}