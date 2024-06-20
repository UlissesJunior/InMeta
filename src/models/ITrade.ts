import { ICard } from "./ICard";

export interface ITradeCard {
    id: string;
    cardId: string;
    tradeId: string;
    type: 'OFFERING' | 'RECEIVING';
    card: ICard;
}

export interface ITrade {
    id: string;
    userId: string;
    createdAt: string;
    user: {
        name: string;
    };
    tradeCards: ITradeCard[];
}
