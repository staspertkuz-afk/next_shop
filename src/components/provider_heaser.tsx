import { cookies } from "next/headers"
import Header from "./header"

export default async function ProviderHeader() {
    const cook = await cookies()
    const s = cook.has('token')
    console.log(s)
    return (
        <Header auth={s} />
    )
}