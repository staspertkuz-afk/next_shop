import Image from "next/image";
import Load_application from '@/components/load_Aplication'
import { logout } from "@/app/lib/logout";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">установить приложение</h1>
      <h1 className="text-5xl">👇</h1>
      <Load_application />
    </div>
  );
}
