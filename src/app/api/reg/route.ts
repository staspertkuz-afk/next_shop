import clientPromise from '@/app/lib/mongoClient' // Тот самый синглтон
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server' // Специальный помощник Next.js для ответов

export async function POST(request: Request) {
    try {
        // 1. Получаем данные из тела запроса
        const { users, email, password } = await request.json()

        // Простейшая валидация
        if (!email || !password) {
            return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 })
        }

        // 2. Используем clientPromise (БЕЗ создания new MongoClient здесь)
        const client = await clientPromise
        const db = client.db('test') // Название базы лучше в .env
        const collection = db.collection('users')

        // 3. Проверка на существующего пользователя
        const normalizedEmail = email.toLowerCase()
        const existingUser = await collection.findOne({ email: normalizedEmail })
        
        if (existingUser) {
            return NextResponse.json({ error: 'Пользователь уже существует' }, { status: 400 })
        }
        
        // 4. Хешируем пароль (12 раундов - стандарт безопасности)
        const hashedPassword = await bcrypt.hash(password, 12)

        // 5. Вставляем в базу
        await collection.insertOne({ 
            name: users, 
            email: normalizedEmail, 
            password: hashedPassword,
            createdAt: new Date() 
        })

        return NextResponse.json({ message: 'Регистрация успешна' }, { status: 201 })

    } catch (error: any) {
        console.error('Ошибка в API:', error)
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
    }
}