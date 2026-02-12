'use server'

import { refresh } from 'next/cache'
import { cookies } from 'next/headers'

export async function Token() {
    const cok = await cookies()
    const i = cok.has('token')

    if(i){
        return true
    }
    return false
}

export async function Tokendel() {
    try{
        const cok = await cookies()
        cok.delete('token')
        return true
    }catch{
        return false
    }
}