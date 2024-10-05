export interface UserData {
    id: string
    name: string
    firstLastName: string
    secondLastName: string
    email: string
    isOwner: boolean
    token: string
}

export interface AuthState {
    userData: UserData | null
    isAuthenticated: boolean | null
}
