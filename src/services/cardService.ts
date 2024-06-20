import api from './api';
import { ICard } from '@models/ICard';

export const getAllCards = async (rpp: number, page: number): Promise<ICard[]> => {
  const response = await api.get<{ list: ICard[] }>('/cards', {
    params: { rpp, page },
  });
  return response.data.list;
};

export const addCardsToUser = async (cardIds: string[], token: string): Promise<void> => {
  await api.post('/me/cards', { cardIds }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserCards = async (token: string): Promise<ICard[]> => {
  const response = await api.get<ICard[]>('/me/cards', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};