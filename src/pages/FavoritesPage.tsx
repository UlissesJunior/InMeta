import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Navbar } from '../components/Navbar';
import Trade from '../components/Trade';
import { getFavorites, removeFavorite } from '../utils/FavoritesUtils';
import { ITrade } from '@models/ITrade';
import { toast } from 'react-toastify';

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<ITrade[]>([]);

    useEffect(() => {
        const loadFavorites = () => {
            const favoritesData = getFavorites();
            const userEmail = localStorage.getItem('email');
            if (userEmail && favoritesData[userEmail]) {
                setFavorites(favoritesData[userEmail]);
            }
        };

        loadFavorites();
    }, []);

    const handleRemoveFavorite = (tradeId: string) => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            removeFavorite(userEmail, tradeId);
            setFavorites(prevFavorites => prevFavorites.filter(trade => trade.id !== tradeId));
            toast.success('Trade removido dos favoritos com sucesso!');
        }
    };

    return (
        <Container height={true}>
            <Navbar />
            <div className='flex flex-col p-8'>
                {favorites.length ? (
                    favorites.map((trade) => (
                        <Trade key={trade.id} trade={trade} onRemoveFavorite={handleRemoveFavorite} />
                    ))
                ) : (
                    <p>Nenhum trade favorito encontrado.</p>
                )}
            </div>
        </Container>
    );
};

export default FavoritesPage;
