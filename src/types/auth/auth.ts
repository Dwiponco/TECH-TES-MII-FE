export interface SessionProps {
    token: string
    expires_at: number
    user_info: {
        username: string
        status: boolean
    }
}