import { ITrade } from "@/models/ITrade";

export const getFavorites = () => {
    const favoritesData = localStorage.getItem('favorites');
    return favoritesData ? JSON.parse(favoritesData) : {};
};

export const addFavorite = (userEmail: string, trade: ITrade) => {
    const favoritesData = getFavorites();
    const userFavorites = favoritesData[userEmail] || [];
    
    if (!userFavorites.some((favTrade: ITrade) => favTrade.id === trade.id)) {
        userFavorites.push(trade);
        favoritesData[userEmail] = userFavorites;
        localStorage.setItem('favorites', JSON.stringify(favoritesData));
    }
};

export const removeFavorite = (userEmail: string, tradeId: string) => {
    const favoritesData = getFavorites();
    const userFavorites = favoritesData[userEmail] || [];
    const updatedFavorites = userFavorites.filter((favTrade: ITrade) => favTrade.id !== tradeId);
    
    favoritesData[userEmail] = updatedFavorites;
    localStorage.setItem('favorites', JSON.stringify(favoritesData));
};

export const isFavorite = (userEmail: string, tradeId: string) => {
    const favoritesData = getFavorites();
    const userFavorites = favoritesData[userEmail] || [];
    return userFavorites.some((favTrade: ITrade) => favTrade.id === tradeId);
};
