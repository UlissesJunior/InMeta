import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Navbar } from '../components/Navbar';
import Trade from '../components/Trade';
import { ITrade } from '@models/ITrade';
import { useAuth } from '../contexts/AuthContext';
import { getAllTrades } from '../services/tradeService';
import { toast } from 'react-toastify';

const UserTradesPage: React.FC = () => {
    const [userTrades, setUserTrades] = useState<ITrade[]>([]);
    const { user, token } = useAuth();

    useEffect(() => {
        const loadUserTrades = async () => {
            if (user && token) {
                try {
                    const trades = await getAllTrades(100, 1); // Ajuste os parâmetros conforme necessário
                    const userSpecificTrades = trades.filter(trade => trade.userId === user.id);
                    setUserTrades(userSpecificTrades);
                } catch (error) {
                    toast.error('Erro ao carregar as trocas do usuário.');
                }
            }
        };

        loadUserTrades();
    }, [user, token]);

    const handleDeleteTrade = (tradeId: string) => {
        setUserTrades(prevTrades => prevTrades.filter(trade => trade.id !== tradeId));
        toast.success('Trade excluída com sucesso!');
    };

    return (
        <Container height={true}>
            <Navbar />
            <div className='flex flex-col p-8'>
                {userTrades.length ? (
                    userTrades.map((trade) => (
                        <Trade key={trade.id} trade={trade} onDeleteTrade={handleDeleteTrade} />
                    ))
                ) : (
                    <p>Nenhuma troca encontrada.</p>
                )}
            </div>
        </Container>
    );
};

export default UserTradesPage;
