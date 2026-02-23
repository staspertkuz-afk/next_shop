import ProfileCard from "./ProfileCard";

// Описываем тип пользователя прямо здесь
export type User = {
  name: string;
  email: string;
  password?: string;
};

export default async function Page() {
  // Представь, что здесь идет запрос к БД
  // const user: User = await prisma.user.findFirst();

  const mockUser: User = {
    name: "Константин",
    email: "konstantin@example.com",
    password: "secure_password_2026",
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-[600px] min-w-[450px] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        {/* Хедер карточки */}
        <div className="relative h-32 bg-gradient-to-tr from-indigo-600 to-violet-500">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 bg-white rounded-2xl rotate-3 shadow-lg flex items-center justify-center border-4 border-white">
              <span className="text-3xl font-black text-indigo-600 -rotate-3">
                {mockUser.name[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-14 p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-slate-800">Личные данные</h1>
            <p className="text-sm text-slate-400">Настройте ваш профиль</p>
          </div>

          {/* Передаем типизированные данные в клиентский компонент */}
          <ProfileCard user={mockUser} />

          <button className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
}