"use client";

import React, { useState } from "react";
// Импортируем тип, если он в другом файле, либо дублируем здесь
type User = {
  name: string;
  email: string;
  password?: string;
};

interface ProfileCardProps {
  user: User;
}

// Тип для пропсов вспомогательной строки
interface FieldProps {
  label: string;
  value: string | undefined;
  isPassword?: boolean;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Внутренний компонент с типизацией
  const Field: React.FC<FieldProps> = ({ label, value, isPassword }) => (
    <div className="mb-4">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1 mb-1.5 block">
        {label}
      </label>
      <div className="group relative flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 transition-all focus-within:bg-white focus-within:border-indigo-200 focus-within:ring-4 focus-within:ring-indigo-50">
        <span className="text-slate-700 font-semibold text-sm truncate">
          {isPassword && !showPassword ? "••••••••••••" : value}
        </span>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-auto text-[10px] font-black text-indigo-500 hover:text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md transition-colors"
          >
            {showPassword ? "СКРЫТЬ" : "ПОКАЗАТЬ"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <Field label="Имя пользователя" value={user.name} />
      <Field label="Эл. почта" value={user.email} />
      <Field label="Пароль" value={user.password} isPassword />
    </div>
  );
}