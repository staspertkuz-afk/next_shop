'use server'
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request:NextRequest){
  console.log('middleware')
  const cookieStore = await cookies()
  const Token = cookieStore.get('token')?.value
  console.log('sadsa')
  if(!Token){
    return NextResponse.redirect(new URL('/reg', request.url))
  }

  try{
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {payload} = await jwtVerify(Token as string, secret);
    console.log(payload)
  }catch(err){
    return NextResponse.redirect('/reg');
  }
}

export const config = {
  matcher: ['/posts/:path*', '/create_post', '/profile/:path*'],
};