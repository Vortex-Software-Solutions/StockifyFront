import { LoginDto } from '../models/dtos/auth/loginDto'
import { serverApi } from '../serverApi'
import { AuthResponse } from "../models/responses/auth.response"
import { RegisterDto } from '../models/dtos/auth/registerDto'

export const authServerApi = serverApi.injectEndpoints({ 
    endpoints: (builder) => ({

        register: builder.mutation<AuthResponse, RegisterDto>({
            query: (newUser) => ({
                url: 'Auth/Register',
                method: 'POST',
                body: newUser,
            }),
        }),

        login: builder.mutation<AuthResponse, LoginDto>({
            query: (credentials) => ({
                url: 'Auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        token: builder.query<AuthResponse, void>({
            query: () => `Auth/Token`
        })
    }),
    overrideExisting: false,
})
export const {
    useLoginMutation,
    useRegisterMutation,
    useTokenQuery} = authServerApi
