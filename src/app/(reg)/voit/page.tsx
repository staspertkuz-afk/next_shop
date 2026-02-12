'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Vxod } from '@/app/lib/actions_vxod';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState('');
  const [isValid , setIsvalid] = useState('')
  const router = useRouter()
  const fullText = "ВХОД В АККАУНТ";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange'
  });

  // Эффект бесконечной печати заголовка
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  async function onSubmiti(data: any) {
    console.log("Данные для входа:", data);
    const res = await Vxod(data)
    if(res.ok === 'ok'){
        alert('вы вошли')
        setIsvalid('')
        router.replace('/glav')
    }
    if(res.ok === 'error'){
        setIsvalid(res.data)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-transparent">
      <div className={`w-full max-w-sm border ${isValid?'border-red-500':'border-white/20'} p-8 rounded-xl backdrop-blur-sm transition`}>
        
        {/* Заголовок с эффектом печати */}
        <h1 className="text-xl font-bold text-white mb-8 text-center uppercase tracking-[0.3em] font-mono min-h-[28px]">
          {text}<span className="animate-pulse ml-1 font-light">|</span>
        </h1>
        
        <form className="space-y-2" onSubmit={handleSubmit(onSubmiti)}>
          
          {/* Поле Email / Логин */}
          <div className="flex flex-col">
            <input 
              type="text" 
              {...register("email", {
                required: { value: true, message: "Введите email" },
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Некорректный email' }
              })}
              placeholder="EMAIL"
              className={`w-full bg-transparent border ${errors.login ? 'border-red-500/50' : 'border-white/10'} px-4 py-2 text-white outline-none focus:border-white transition-all text-[12px] font-mono uppercase`}
            />
            <div className="min-h-[20px] pt-1">
              {errors.email && <p className="text-red-500 text-[10px] font-mono leading-none">{String(errors.email.message)}</p>}
            </div>
          </div>

          {/* Поле Пароль */}
          <div className="flex flex-col">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="ПАРОЛЬ" 
                className={`w-full bg-transparent border ${errors.password ? 'border-red-500/50' : 'border-white/10'} px-4 py-2 text-white outline-none focus:border-white transition-all text-[12px] font-mono uppercase pr-20`}
                {...register("password", {
                  required: { value: true, message: "Введите пароль" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])[A-Za-z\d.!@#$%^&*]{8,}$/,
                    message: "Нужны: 8+ симв., заглавная, цифра, спецсимвол"
                  }
                })}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/40 hover:text-white transition-colors font-mono uppercase"
              >
                {showPassword ? "скрыть" : "показать"}
              </button>
            </div>
            <div className="min-h-[20px] pt-1">
              {errors.password && <p className="text-red-500 text-[10px] font-mono leading-none">{String(errors.password.message)}</p>}
            </div>
             <div className="min-h-[10px] pt-1">
              {isValid && <p className='text-red-500 text-[10px] font-mono leading-tight'>{isValid}</p>}
            </div>
          </div>

          <div className="pt-2">
            <button 
              disabled={isSubmitting}
              className="w-full border border-white text-white py-2 hover:bg-white hover:text-black transition-all font-bold uppercase text-[12px] font-mono disabled:opacity-50"
            >
              {isSubmitting ? "ВХОД..." : "ВОЙТИ"}
            </button>
          </div>
        </form>

        {/* Ссылка на регистрацию */}
        <div className="mt-6 text-center">
          <button 
            onClick={()=>{
                router.push('/reg')
            }}
            className="text-[10px] text-white/40 hover:text-white transition-all font-mono uppercase underline-offset-4 hover:underline">
            Нет аккаунта? Регистрация
          </button>
        </div>
      </div>
    </div>
  );
}