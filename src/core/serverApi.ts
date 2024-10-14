import {CONFIG, Environmet} from "@config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

let baseUrl = ""

switch (CONFIG.environment) {
    case Environmet.PROD:
        baseUrl = CONFIG.prod.baseUrl
        break;
    case Environmet.DEV:
        baseUrl = CONFIG.dev.baseUrl
        break;
    case Environmet.LOCAL:
        baseUrl = CONFIG.local.baseUrl
        break;
    default:
        baseUrl = CONFIG.local.baseUrl
        break;
}

export const serverApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Access-Control-Allow-Origin', '*');
            headers.set("Content-Type", "application/json");
            headers.set("Accept", "*/*");

            const state = getState() as RootState
            const token: string = state.auth.userData?.token ?? (() => {
                const authData = localStorage.getItem('auth');
                return authData ? JSON.parse(authData) : "";
            })();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['Company', "User", "Sale", "Provider"],
})