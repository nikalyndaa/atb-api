import type { IUserItem } from "./IUserItem";

export interface IAuthResponse {
    user: IUserItem;
    access: string;
    refresh: string;
}