import React, { useEffect, useRef } from 'react';
import './index.css';

interface TradeDialogProps {
    cards: { imageUrl: string; id: string }[];
    onClose: () => void;
    isOpen: boolean;
}

const TradeDialog: React.FC<TradeDialogProps> = ({ cards, onClose, isOpen }) => {
    const cardContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cards.length > 2) {
            return onClose();
        }

        let timer1: any;
        let timer2: any;
        let timer3: any;
        let timer4: any;

        if (isOpen) {
            timer1 = setTimeout(() => {
                if (cardContainerRef.current) {
                    cardContainerRef.current.classList.add('animate-forward');
                }
            }, 1000);

            timer2 = setTimeout(() => {
                if (cardContainerRef.current) {
                    cardContainerRef.current.classList.add('animate-swap');
                }
            }, 2000);

            timer3 = setTimeout(() => {
                if (cardContainerRef.current) {
                    if (cards.length > 1) {
                        const card1 = cardContainerRef.current.querySelector('.card-1') as HTMLDivElement;
                        const card2 = cardContainerRef.current.querySelector('.card-2') as HTMLDivElement;
                        if (card1 && card2) {
                            const tempImageUrl = card1.style.backgroundImage;
                            card1.style.backgroundImage = card2.style.backgroundImage;
                            card2.style.backgroundImage = tempImageUrl;
                        }
                    }
                    cardContainerRef.current.classList.remove('animate-forward', 'animate-swap');
                }
            }, 4000);

            timer4 = setTimeout(() => onClose(), 5000);
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            if (cardContainerRef.current) {
                cardContainerRef.current.classList.remove('animate-forward', 'animate-swap');
            }
        };
    }, [isOpen, onClose, cards]);

    if (!isOpen) return null;

    return (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <div className="animation-container">
                <div ref={cardContainerRef} className="card-container">
                    {cards.map((card, index) => (
                        <div key={card.id} className={`card card-${index + 1}`} style={{ backgroundImage: `url(${card.imageUrl})` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TradeDialog;