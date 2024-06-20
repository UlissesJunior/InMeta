import api from './api';
import { IAuthResponse, IUser } from '@models/IUser';

export const register = async (name: string, email: string, password: string): Promise<IUser> => {
    const response = await api.post<IAuthResponse>('/register', { name, email, password });
    return response.data.user;
};

export const login = async (email: string, password: string): Promise<IAuthResponse> => {
    const response = await api.post<IAuthResponse>('/login', { email, password });
    return response.data;
};

export const getUser = async (token: string): Promise<IUser> => {
    const response = await api.get<IUser>('/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
