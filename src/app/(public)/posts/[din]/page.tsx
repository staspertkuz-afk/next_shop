'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Comments from './Comments'
import { useEffect, useState } from 'react'

type Post = {
    _id: string
    title: string
    content: string
    comments?: Array<any>
}

type Props = {
    params: Promise<{
        din: string
    }>
}

export default function PostPage({ params }: Props) {
    const [post, setPost] = useState<Post | null>(null)
    const [din, setDin] = useState<string>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        params.then(({ din }) => {
            setDin(din)
            fetch(`http://localhost:4200/api/posts/${din}`)
                .then(res => res.json())
                .then(posts => {
                    setPost(posts[0])
                    setLoading(false)
                })
        })
    }, [params])

    if (loading) return null
    if (!post) return <p className="text-center py-8">Пост не найден</p>

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <Link href="/posts" className="text-blue-500 hover:text-blue-400 mb-4 inline-block">
                        ← Назад к постам
                    </Link>
                </motion.div>

                <motion.article 
                    className="border border-gray-700 rounded-lg p-6"
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h1 
                        className="text-3xl font-bold mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {post.title}
                    </motion.h1>
                    <motion.time 
                        className="text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Дата публикации
                    </motion.time>

                    <motion.div 
                        className="mt-6 text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <p>{post.content}</p>
                    </motion.div>

                    <motion.footer 
                        className="mt-8 text-xs text-gray-500 border-t border-gray-700 pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        ID: {din}
                    </motion.footer>
                </motion.article>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <Comments initialComments={post.comments || []} postId={post._id} />
                </motion.div>
            </div>
        </section>
    )
}