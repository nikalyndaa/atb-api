// utils/createBaseQuery.ts
import {
    fetchBaseQuery,
    type BaseQueryFn
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setAccessToken, logout } from "../store/authSlice";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const rawBaseQuery = (endpointPrefix: string) =>
    fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/${endpointPrefix}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

export const createBaseQuery = (endpointPrefix: string): BaseQueryFn => async (args, api, extraOptions) => {
    const baseQuery = rawBaseQuery(endpointPrefix);
    let result = await baseQuery(args, api, extraOptions);

    // Якщо отримали 401 — токен протух, пробуємо оновити
    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;

        if (refreshToken) {
            const refreshResult = await fetchBaseQuery({
                baseUrl: `${BACKEND_URL}/api`,
            })(
                {
                    url: '/token/refresh/',
                    method: 'POST',
                    body: { refresh: refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const newAccessToken = (refreshResult.data as { access: string }).access;
                api.dispatch(setAccessToken(newAccessToken));

                // Повторюємо оригінальний запит з новим токеном
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Refresh теж не спрацював — розлогінюємо користувача
                api.dispatch(logout());
            }
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};