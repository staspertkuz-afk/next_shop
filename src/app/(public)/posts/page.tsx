import Clientposts from "./clent_Posts"

export default async function Page() {
    const data = await fetch('http://localhost:4200/api/posts')
    const posts = await data.json()
    return (
        <Clientposts data={posts} />
    );
}