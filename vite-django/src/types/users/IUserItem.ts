export interface IUserItem{
    id:string;
    email:string;
    first_name:string;
    last_name:string;
    username:string;

    image_small: string | null;
    image_medium: string | null;
    image_large: string | null;
}