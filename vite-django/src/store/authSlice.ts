// store/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserItem } from "../types/users/IUserItem";

interface AuthState {
    user: IUserItem | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: IUserItem; access: string; refresh: string }>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;

            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('accessToken', action.payload.access);
            localStorage.setItem('refreshToken', action.payload.refresh);
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { setCredentials, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;