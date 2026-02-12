'use client';
import { useState, useEffect, useActionState } from 'react';
import { useForm } from 'react-hook-form'
import { createAkk } from '@/app/lib/actions_create_akk';
import { p } from 'motion/react-client';
import { useRouter } from 'next/navigation'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState('');
  const [valid, setValid] = useState(true);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    reset,
  } = useForm({mode: 'onChange'});

  const fullText = "РЕГИСТРАЦИЯ";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

    async function onSubmit(data:any) {
        console.log(data)
        const res = await createAkk(data);
        console.log(res)
        if(res.ok === 'ok'){
            setValid(true)
            alert('Аккаунт создан')
            reset()
            router.replace('/glav')
        }
        if(res.ok === 'error'){
            setValid(false)
        }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-transparent">
      <div className={`w-full max-w-sm border ${valid? 'border-white/20' : 'border-red-600'} p-8 rounded-xl backdrop-blur-sm transition`}>
        <h1 className="text-xl font-bold text-white mb-8 text-center uppercase tracking-[0.3em] font-mono min-h-[28px]">
          {text}
          <span className="animate-pulse ml-1">|</span>
        </h1>
        
        {/* Изменил space-y на меньшее значение, так как отступы теперь внутри контейнеров полей */}
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Поле Имя */}
          <div className="flex flex-col">
            <input 
              type="text" 
              {...register("users", {
                  required: { value: true, message: "Введите имя" },
                  minLength: { value: 3, message: 'Минимум 3 символа' },
                  pattern: { value: /^[A-Za-z]+$/i, message: 'Только латиница без цифр' },                                               
              })}
              placeholder="ИМЯ ПОЛЬЗОВАТЕЛЯ"
              className={`w-full bg-transparent border ${errors.users ? 'border-red-500/50' : 'border-white/10'} px-4 py-2 text-white outline-none focus:border-white transition-all text-[12px] font-mono uppercase`}
            />
            <div className="min-h-[20px] pt-1">
              {errors.users && <p className="text-red-500 text-[10px] font-mono leading-none">{String(errors.users.message)}</p>}
            </div>
          </div>

          {/* Поле Email */}
          <div className="flex flex-col">
            <input 
              type="email" 
              placeholder="EMAIL"
              className={`w-full bg-transparent border ${errors.email ? 'border-red-500/50' : 'border-white/10'} px-4 py-2 text-white outline-none focus:border-white transition-all text-[12px] font-mono uppercase`}
              {...register("email", {
                  required: { value: true, message: "Введите email" },
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Некорректный email' }
              })}
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
            <div className="min-h-[17px] pt-1">
              {errors.password && <p className="text-red-500 text-[10px] font-mono leading-tight">{String(errors.password.message)}</p>}
            </div>
          </div>
            <div className="min-h-[10px] pt-1">
              {!valid && <p className='text-red-500 text-[10px] font-mono leading-tight'>ошибка при создании аккаунта</p>}
            </div>
          <div className="pt-2">
            <button className="w-full border border-white text-white py-2 hover:bg-white hover:text-black transition-all font-bold uppercase text-[12px] font-mono">
              {isSubmitting?'загрузка': 'создать аккаунт'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={
              () =>{
                router.replace('/voit')
              }
            }
            className="text-[10px] text-white/40 hover:text-white transition-all font-mono uppercase underline-offset-4 hover:underline"
          >
            Уже есть аккаунт? Войти
          </button>
        </div>
      </div>
    </div>
  );
}