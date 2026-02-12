'use client'

import {motion} from "framer-motion"
import Link from "next/link"

type Post = {
    _id: string
    title: string
    content: string
    data: string
    createdAt: string
}

function excerpt(text: string, max = 50) {
    if (!text) return ''
    return text.length > max ? text.slice(0, max).trimEnd() + '…' : text
}

export default function Page({ data }: { data: Post[] }) {
    console.log(data)
    return (
        <section className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold mb-4">Посты</h1>

            <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data && data.length > 0 ? (
                    data.map((post, i) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 12, scale: 0.995 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.45, delay: i * 0.06 }}
                            className="bg-zinc-900 p-5 rounded-lg "
                        >
                            <header className="mb-3">
                                <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                                <time className="text-xs text-gray-400">{post?.createdAt}</time>
                            </header>

                            <p className="text-sm text-gray-300 mb-4">{excerpt(post.content)}</p>

                            <div className="mt-auto flex items-center justify-between gap-3">
                                <Link className="text-sm text-indigo-300 hover:text-indigo-200" href={`/posts/${post._id}`}>
                                    Читать
                                </Link>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-gray-300">Постов пока нет.</div>
                )}
            </motion.div>
        </section>
    )
}