import Header from "@/components/header"
import { Token } from "../lib/action_token"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const tok = await Token()
    console.log(tok)

    return (
        <>
            <Header TOK={tok}/>
            <div className="flex justify-center items-center mt-25">
                {children}
            </div>
        </>
    )
}