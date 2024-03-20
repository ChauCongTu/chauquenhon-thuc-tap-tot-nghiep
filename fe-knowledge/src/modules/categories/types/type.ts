import { Post } from "../../post/type/postType"

export interface Category {
    id?: number,
    name: string,
    summary: string,
    slug?: string,
    posts: Post[],
    created_at: string,
    updated_at: string
}