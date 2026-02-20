"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { API } from '@/global/API'

export default function CreatePostPage() {
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        user: '',
        data: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(API.posts, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                router.push('/posts') 
                router.refresh()
            } else {
                alert('Ошибка при создании поста')
            }
        } catch (error) {
            console.error(error)
            alert('Ошибка сети')
        } finally {
            setLoading(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <motion.div 
            className="container mx-auto px-4 py-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link href="/posts" className="text-blue-500 hover:text-blue-400 mb-6 inline-block">
                    ← Назад к списку
                </Link>
            </motion.div>

            <motion.h1 
                className="text-3xl font-bold mb-8 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Создать новый пост
            </motion.h1>

            <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Заголовок
                    </label>
                    <input
                        required
                        type="text"
                        className="w-full p-3 rounded bg-zinc-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="О чем будет пост?"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Автор
                    </label>
                    <input
                        required
                        type="text"
                        className="w-full p-3 rounded bg-zinc-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ваше имя"
                        value={formData.user}
                        onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Содержание
                    </label>
                    <textarea
                        required
                        rows={6}
                        className="w-full p-3 rounded bg-zinc-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Напишите здесь свои мысли..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Теги / Метаданные (необязательно)
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 rounded bg-zinc-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="#тег1 #тег2"
                        value={formData.data}
                        onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? 'Публикация...' : 'Опубликовать пост'}
                </motion.button>
            </motion.form>
        </motion.div>
    )
}