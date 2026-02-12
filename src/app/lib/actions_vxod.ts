'use server'

import { API } from "@/global/API"
import { cookies } from 'next/headers'

type dateVxod = {
    email:string,
    password:string
}

export async function Vxod(data:dateVxod) {
    try{
        const res = await fetch(API.users)
        if(!res.ok){
            throw new Error()
        }
        const result:Data[] = await res.json()

        let i1 = false
        result.forEach((i) => {
            if(i.email === data.email){
                if(i.password.trim() === data.password.trim()){
                    i1 = true
                }
            }
        })

        if(i1){
            const coocie = await cookies()
            coocie.set('token', data.email.trim(), {
                httpOnly:true,
                sameSite:'strict',
                maxAge:60*60*24*30,
                path:'/'
            })
            return {
                ok:'ok',
                data:'вход прошел успешен'
            }
        }
        else{
            return{
                ok:'error',
                data:'что то пошло не так'
            }
        }
    }catch{
        return{
            ok:'error',
            data:"произошла ошибочка"
        }
    }
}