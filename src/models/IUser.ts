import { ICard } from "./ICard";

export interface IUser {
    id: string;
    name: string;
    email: string;
    cards: ICard[];
}

export interface IAuthResponse {
    token: string;
    user: IUser;
}  