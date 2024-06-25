// components/Cards.tsx

import React, { useEffect, useState } from 'react';
import { getUserCards, getAllCards, addCardsToUser } from '../../services/cardService';
import { useAuth } from '../../contexts/AuthContext';
import { ICard } from '@models/ICard';
import { toast, Slide } from 'react-toastify';
import AddCardsDialog from '../../dialogs/AddCardsDialog';

const Cards: React.FC = () => {
    const { token } = useAuth();
    const [userCards, setUserCards] = useState<ICard[]>([]);
    const [allCards, setAllCards] = useState<ICard[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserCards = async () => {
            if (token) {
                const cards = await getUserCards(token);
                setUserCards(cards.filter(card => card.imageUrl));
            }
        };

        const fetchAllCards = async () => {
            const cards = await getAllCards(100, 1);
            setAllCards(cards.filter(card => card.imageUrl));
        };

        fetchUserCards();
        fetchAllCards();
    }, [token]);

    const handleAddCards = async () => {
        if (token) {
            try {
                await addCardsToUser(selectedCardIds, token);
                toast(`🔐 Cartas adicionadas com sucesso `, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                setIsDialogOpen(false);
                const updatedCards = await getUserCards(token);
                setUserCards(updatedCards.filter(card => card.imageUrl));
            } catch (error) {
                console.error('Erro ao adicionar cartas:', error);
                alert('Falha ao adicionar cartas.');
            }
        }
    };

    const handleCardSelect = (cardId: string) => {
        setSelectedCardIds((prevSelected) =>
            prevSelected.includes(cardId)
                ? prevSelected.filter((id) => id !== cardId)
                : [...prevSelected, cardId]
        );
    };

    return (
        <div className="p-6 overflow-y-auto w-full">
            <h1 className="text-black font-medium mb-4">Minhas Cartas</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    className="flex justify-center items-center bg-gray-600 h-auto cursor-pointer rounded-lg"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <span className="text-6xl text-gray-200">+</span>
                </div>
                {userCards.map((card) => (
                    <div key={card.id} className="relative">
                        <img src={card.imageUrl} alt={card.name} className="w-full h-auto rounded-lg" />
                        {userCards.filter(c => c.id === card.id).length > 1 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                {userCards.filter(c => c.id === card.id).length}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <AddCardsDialog
                allCards={allCards}
                selectedCardIds={selectedCardIds}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onAddCards={handleAddCards}
                onCardSelect={handleCardSelect}
            />
        </div>
    );
};

export default Cards;
