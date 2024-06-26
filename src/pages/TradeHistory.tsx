import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Navbar } from '../components/Navbar';
import Trade from '../components/Trade';
import { getTradeHistory } from '../utils/TradeHistoryUtils';
import { ITrade } from '@models/ITrade';
import { toast } from 'react-toastify';

const TradeHistoryPage: React.FC = () => {
    const [tradeHistory, setTradeHistory] = useState<ITrade[]>([]);

    useEffect(() => {
        const loadTradeHistory = () => {
            const historyData = getTradeHistory();
            const userEmail = localStorage.getItem('email');
            
            if (userEmail && historyData[userEmail]) {
                setTradeHistory(historyData[userEmail]);
            }
        };

        loadTradeHistory();
    }, []);

    const handleRemoveFavorite = (tradeId: string) => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            const updatedTradeHistory = tradeHistory.filter(trade => trade.id !== tradeId);
            setTradeHistory(updatedTradeHistory);
            toast.success('Trade removido dos favoritos com sucesso!');
            
            const historyData = getTradeHistory();
            historyData[userEmail] = updatedTradeHistory;
            localStorage.setItem('tradeHistory', JSON.stringify(historyData));
        }
    };

    return (
        <Container height={true}>
            <Navbar />
            <div className='flex flex-col p-8'>
                {tradeHistory.length ? (
                    tradeHistory.map((trade, index) => (
                        <Trade key={trade.id + index} trade={trade} onRemoveFavorite={handleRemoveFavorite} />
                    ))
                ) : (
                    <p>Nenhuma troca efetuada.</p>
                )}
            </div>
        </Container>
    );
};

export default TradeHistoryPage;
