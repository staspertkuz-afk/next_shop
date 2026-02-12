"use client"

import { useState } from 'react'

type Comment = { user: string; text: string }

// Выносим логику запроса за пределы компонента (Separation of Concerns)
async function sendCommentToApi(postId: string, comment: Comment) {
    const res = await fetch(`http://localhost:4200/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
    })
    
    if (!res.ok) {
        throw new Error('Failed to send comment')
    }
}

export default function Comments({ initialComments = [], postId }: { initialComments?: Comment[]; postId: string }) {
    // initialComments = [] в дефолтном значении убирает необходимость писать (initialComments || []) в стейте
    const [comments, setComments] = useState<Comment[]>(initialComments)
    
    // Состояния формы
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState('')
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    // Хендлер сброса формы
    const handleReset = () => {
        setOpen(false)
        setUser('')
        setText('')
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        const trimmedText = text.trim()
        const trimmedUser = user.trim() || 'Гость' // Исправлено: используем введенное имя или дефолтное

        if (!trimmedText) return

        const newComment: Comment = { user: trimmedUser, text: trimmedText }
        
        // Сохраняем предыдущее состояние для отката (Rollback) в случае ошибки
        const prevComments = comments

        // 1. Оптимистичное обновление UI
        setComments((prev) => [...prev, newComment])
        handleReset() // Сразу закрываем форму для мгновенного отклика
        setLoading(true)

        try {
            // 2. Отправка на сервер
            await sendCommentToApi(postId, newComment)
        } catch (err) {
            console.error('Ошибка отправки комментария:', err)
            // 3. Rollback: если ошибка, возвращаем старый список
            setComments(prevComments)
            // Можно добавить тост/уведомление об ошибке здесь
            alert('Не удалось отправить комментарий') 
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Комментарии</h2>
                <button
                    className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? 'Отмена' : 'Добавить комментарий'}
                </button>
            </div>

            {open && (
                <form className="mb-4" onSubmit={handleSubmit}>
                    <input
                        className="w-full mb-2 p-2 rounded bg-zinc-900 border border-gray-700 text-sm"
                        placeholder="Ваше имя"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <textarea
                        className="w-full mb-2 p-2 rounded bg-zinc-900 border border-gray-700 text-sm"
                        placeholder="Текст комментария"
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button 
                            type="submit" 
                            className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded disabled:opacity-50" 
                            disabled={loading || !text.trim()}
                        >
                            {loading ? 'Отправка...' : 'Отправить'}
                        </button>
                        <button 
                            type="button" 
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded" 
                            onClick={handleReset}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            )}

            {comments.length > 0 ? (
                <ul className="space-y-3">
                    {comments.map((c, i) => (
                        <li key={i} className="p-3 rounded border border-gray-800 bg-zinc-900">
                            <div className="flex items-center justify-between">
                                <strong className="text-sm text-white">{c.user}</strong>
                            </div>
                            <p className="mt-2 text-gray-300 text-sm">{c.text}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400">Комментариев пока нет.</p>
            )}
        </section>
    )
}