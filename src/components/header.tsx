'use client'

import { logout } from '@/app/lib/logout'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header({auth}: {auth:boolean}) {
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const navLinks = [
        { href: '/glav', label: 'главная' },
        { href: '/posts', label: 'посты' },
        { href: '/chats', label: 'чаты' },
        { href: '/profile', label: 'профиль' },
        { href: '/create_post', label: 'создать пост' },
    ]

    const isActive = (href: string) => pathname === href

    return (
        <motion.header 
            className="fixed top-0 right-0 left-0 border-b border-gray-700 backdrop-blur-md z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <motion.div 
                    className="flex items-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => router.push('/glav')}
                >
                    <Image src='/vercel.svg' alt='Logo' width={40} height={40} />
                </motion.div>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex gap-8 items-center'>
                    {navLinks.map((link, i) => (
                        <motion.div key={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                            <Link 
                                href={link.href}
                                className={`text-sm font-medium transition relative ${
                                    isActive(link.href) 
                                        ? 'text-blue-500' 
                                        : 'text-gray-300 hover:text-blue-500'
                                }`}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <motion.div
                                        className="absolute bottom-[-3px] left-0 right-0 h-0.5 bg-blue-500"
                                        layoutId="underline"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Auth Button */}
                <div className="hidden md:block">
                    <motion.button
                        className='border-2 border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-600 hover:text-white transition'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={auth? logout : () => router.push('/reg')}
                    >
                        {auth?'выйти':'войти'}    
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="md:hidden flex flex-col gap-1.5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <motion.span 
                        className="w-6 h-0.5 bg-white"
                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span 
                        className="w-6 h-0.5 bg-white"
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span 
                        className="w-6 h-0.5 bg-white"
                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className="md:hidden border-t border-gray-700"
                initial={{ height: 0 }}
                animate={{ height: isOpen ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
            >
                <div className="px-6 py-4 flex flex-col gap-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`py-2 transition ${
                                isActive(link.href)
                                    ? 'text-blue-500 font-bold'
                                    : 'text-gray-300'
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-gray-700">
                        <motion.button 
                            className='border-2 border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-600 hover:text-white transition'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/reg')}
                        >
                            войти    
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.header>
    )

    /* return (
        <div>{auth?'выйти':'войти'}</div>
    ) */
}