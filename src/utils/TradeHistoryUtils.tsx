import { ITrade } from "@/models/ITrade";

export const getTradeHistory = () => {
    const historyData = localStorage.getItem('tradeHistory');
    return historyData ? JSON.parse(historyData) : {};
};

export const addTradeHistory = (userEmail: string, trade: ITrade) => {
    const historyData = getTradeHistory();
    const userHistory = historyData[userEmail] || [];
    
    if (!userHistory.some((histTrade: ITrade) => histTrade.id === trade.id)) {
        userHistory.push(trade);
        historyData[userEmail] = userHistory;
        localStorage.setItem('tradeHistory', JSON.stringify(historyData));
    }
};
