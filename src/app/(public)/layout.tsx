import Header_provider from "@/components/provider_heaser"

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header_provider />
            <div className="flex justify-center items-center mt-25">
                {children}
            </div>
        </>
    )
}