import React, { useState, useEffect } from "react";
import { ITrade } from '@models/ITrade';
import TradeDialog from '../../dialogs/TradeDialog';

interface TradeProps {
    trade: ITrade;
}

export const Trade: React.FC<TradeProps> = ({ trade }) => {
    const [currentOfferingIndex, setCurrentOfferingIndex] = useState(0);
    const [currentReceivingIndex, setCurrentReceivingIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    const offeringCards = trade.tradeCards.filter((tc) => tc.type === 'OFFERING');
    const receivingCards = trade.tradeCards.filter((tc) => tc.type === 'RECEIVING');

    const handleMouseEnter = () => {
        if (offeringCards.length > 1) {
            const id = window.setInterval(() => {
                setCurrentOfferingIndex((prevIndex) => (prevIndex + 1) % offeringCards.length);
            }, 1000);
            setIntervalId(id);
        }
        if (receivingCards.length > 1) {
            const id = window.setInterval(() => {
                setCurrentReceivingIndex((prevIndex) => (prevIndex + 1) % receivingCards.length);
            }, 1000);
            setIntervalId(id);
        }
    };

    const handleMouseLeave = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setCurrentOfferingIndex(0);
        setCurrentReceivingIndex(0);
    };

    const handleAccept = () => {
        setShowAnimation(true);
    };

    const handleCloseDialog = () => {
        setShowAnimation(false);
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    return (
        <div>
            <div
                className="flex font-sans rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 my-2 bg-white"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex-none w-48 relative">
                    {offeringCards.map((tc, index) => (
                        <img
                            key={tc.id}
                            src={tc.card.imageUrl}
                            alt={tc.card.name}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentOfferingIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-1">
                        {offeringCards.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentOfferingIndex ? 'bg-white' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
                <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-900">
                            Troca oferecida pelo usuário {trade.user.name}
                        </h1>
                    </div>
                    <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div className="space-x-2 flex text-sm">
                        </div>
                    </div>
                    <div className="flex space-x-4 justify-center mb-6 text-sm font-medium">
                        <button
                            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                            type="button"
                            onClick={handleAccept}
                        >
                            Aceitar
                        </button>
                        <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </button>
                        <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                            Recusar
                        </button>
                    </div>
                </form>
                <div className="flex-none w-48 relative ">
                    {receivingCards.map((tc, index) => (
                        <img
                            key={tc.id}
                            src={tc.card.imageUrl}
                            alt={tc.card.name}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentReceivingIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-1">
                        {receivingCards.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentReceivingIndex ? 'bg-indigo-600' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <TradeDialog
                cards={[...offeringCards, ...receivingCards].map(tc => ({ imageUrl: tc.card.imageUrl, id: tc.id }))}
                onClose={handleCloseDialog}
                isOpen={showAnimation}
            />
        </div>
    );
};
