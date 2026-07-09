import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery.ts";
import type {IUserItem} from "../types/users/IUserItem.ts";

import type { IRegisterRequest } from "../types/users/IRegisterRequest.ts";
import type { ILoginRequest } from "../types/users/ILoginRequest.ts";
import type { IAuthResponse } from "../types/users/IAuthResponse.ts";

export const usersApi = createApi({
    baseQuery: createBaseQuery('users'),
    tagTypes: ['users'],
    reducerPath: "usersApi",
    endpoints: (builder) => ({
        getUsers: builder.query<IUserItem[], void>({
            query: () => {
                return {
                    url: '/',
                    method: 'GET'
                }
            }
        }),

        login: builder.mutation<IAuthResponse, ILoginRequest>({
            query: (userData) => ({
                url: '/login/',
                method: 'POST',
                body: userData, 
            }),
        }),


        register: builder.mutation<IAuthResponse, IRegisterRequest>({
            query: (userData) => {
                const formData = new FormData();
                formData.append("username", userData.username)
                formData.append("first_name", userData.first_name)
                formData.append("last_name", userData.last_name)
                formData.append("email", userData.email)
                formData.append("password", userData.password)
                formData.append("confirm_password", userData.confirm_password)
                if (userData.image) {
                    formData.append('image', userData.image)
                }
                return{
                    url: '/register/',
                    method: 'POST',
                    body: formData, 
                }
            },
        }),

        logout: builder.mutation<void, { refresh: string }>({
            query: (body) => ({
                url: '/logout/',
                method: 'POST',
                body,
            }),
        }),
    })
});

export const {
    useGetUsersQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = usersApi;