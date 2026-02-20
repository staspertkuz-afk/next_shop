import { API } from "@/global/API";
import Clientposts from "./clent_Posts"

export default async function Page() {
    const data = await fetch(API.posts)
    const posts = await data.json()
    return (
        <Clientposts data={posts} />
    );
}