'use client';
import { useEffect, useState } from 'react';

export default function InstallBtn() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!prompt) return null;

  return (
    <button
      onClick={() => {
        prompt.prompt();
        setPrompt(null);
      }}
      style={{
        // Стили под твой интерфейс (темный фон, синяя кнопка)
        backgroundColor: '#1d7ed8', // Синий цвет как у кнопки "Войти"
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px', // Закругление как у тебя в шапке
        border: 'none',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        fontFamily: 'inherit', // Наследует твой шрифт
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#155da1')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1d7ed8')}
    >
      <img src="/down.svg" alt="Install" className='w-9'/>
    </button>
  );
}