import { User } from "../../users/types/type";

export interface CommentType {
    id: number;
    post_id: number;
    user_id: number;
    content: string;
    author: User;
    created_at: string;
    updated_at: string;
}

export interface Like {
    id: number;
    post_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    is_feature: number;
    excerpt: string;
    author_id: number;
    category_id: number;
    status: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    slug: string;
    thumb: string;
    tags: string;
    author: User;
    comments: Comment[]; // Chú ý, đây là một mảng các comments, bạn có thể định nghĩa một interface riêng cho comment nếu cần
    likes: Like[];
}

