// app/actions/auth.ts
'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();
  
  // Удаляем куку с токеном
  cookieStore.delete('token');
  
  // Перенаправляем пользователя на главную или страницу логина
  redirect('/reg');
}