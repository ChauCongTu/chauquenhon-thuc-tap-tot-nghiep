export interface User {
    id?: number,
    username: string,
    full_name: string,
    google_id: string,
    email: string,
    avatar: string,
    created_at?: string,
    updated_at?: string
}
export interface GetFromTokenRp {
    success: boolean,
    message: string,
    data: User | null
}
