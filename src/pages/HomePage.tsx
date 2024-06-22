import React, { useEffect, useState } from 'react';
import { getAllTrades } from '../services/tradeService';
import { ITrade } from '@models/ITrade';
import { Navbar } from '../components/Navbar';
import { Container } from '../components/Container';
import { Trade } from '../components/Trade';

const HomePage: React.FC = () => {
    const [trades, setTrades] = useState<ITrade[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchTrades = async () => {
            const newTrades = await getAllTrades(10, currentPage);
            setTrades((prevTrades) => [...prevTrades, ...newTrades]);
        };

        fetchTrades();
    }, [currentPage]);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        });

        const sentinel = document.querySelector('#sentinela');
        if (sentinel) {
            intersectionObserver.observe(sentinel);
        }

        return () => intersectionObserver.disconnect();
    }, []);

    return (
        <Container>
            <Navbar />
            <div className='flex flex-col p-8'>
                {/* //Fazer animação de troca muito foda */}
                {trades.length ? (
                    trades.map((trade) => (
                        <Trade key={trade.id} trade={trade} />
                    ))
                ) : (
                    <p>No trades available</p>
                )}
                <div id="sentinela" className="h-10 bg-transparent"></div>
            </div>
        </Container>
    );
};

export default HomePage;
