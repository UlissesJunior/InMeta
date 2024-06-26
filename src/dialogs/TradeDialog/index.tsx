import React, { useEffect } from 'react';
import './index.css';

interface TradeDialogProps {
    cards: { imageUrl: string; id: string }[];
    onClose: () => void;
    isOpen: boolean;
}

const TradeDialog: React.FC<TradeDialogProps> = ({ cards, onClose, isOpen }) => {
    useEffect(() => {
        let timer1: any;
        let timer2: any;
        let timer3: any;
        let timer4: any;

        if (isOpen) {
            timer1 = setTimeout(() => {
                const cardContainer = document.querySelector('.card-container');
                if (cardContainer) {
                    cardContainer.classList.add('animate-forward');
                }
            }, 1000);

            timer2 = setTimeout(() => {
                const cardContainer = document.querySelector('.card-container');
                if (cardContainer) {
                    cardContainer.classList.add('animate-swap');
                }
            }, 2000);

            timer3 = setTimeout(() => {
                const cardContainer = document.querySelector('.card-container');
                if (cardContainer) {
                    const card1 = document.querySelector('.card-1') as HTMLDivElement;
                    const card2 = document.querySelector('.card-2') as HTMLDivElement;
                    if (card1 && card2) {
                        const tempImageUrl = card1.style.backgroundImage;
                        card1.style.backgroundImage = card2.style.backgroundImage;
                        card2.style.backgroundImage = tempImageUrl;
                    }
                    cardContainer.classList.remove('animate-forward', 'animate-swap');
                }
            }, 4000);

            timer4 = setTimeout(() => onClose(), 5000);
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            const cardContainer = document.querySelector('.card-container');
            if (cardContainer) {
                cardContainer.classList.remove('animate-forward', 'animate-swap');
            }
            if(cards.length > 2) {
                onClose();
            }
        };

    }, [isOpen, onClose, cards]);

    if (!isOpen) return null;

    // Ensuring only the first two cards are used for animation
    const card1 = cards[0] || { imageUrl: '', id: 'card-1' };
    const card2 = cards[1] || { imageUrl: '', id: 'card-2' };

    return (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <div className="animation-container">
                <div className="card-container">
                    <div className="card card-1" style={{ backgroundImage: `url(${card1.imageUrl})` }}></div>
                    <div className="card card-2" style={{ backgroundImage: `url(${card2.imageUrl})` }}></div>
                </div>
            </div>
        </div>
    );
};

export default TradeDialog;
