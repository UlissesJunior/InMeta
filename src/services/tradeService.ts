import api from './api';
import { ITrade } from '@models/ITrade';

export const createTrade = async (cards: { cardId: string; type: 'OFFERING' | 'RECEIVING' }[], token: string): Promise<ITrade> => {
  const response = await api.post<ITrade>('/trades', { cards }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllTrades = async (rpp: number, page: number): Promise<ITrade[]> => {
  const response = await api.get<{ list: ITrade[] }>('/trades', {
    params: { rpp, page },
  });
  return response.data.list;
};

export const deleteTrade = async (tradeId: string, token: string): Promise<void> => {
  await api.delete(`/trades/${tradeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
