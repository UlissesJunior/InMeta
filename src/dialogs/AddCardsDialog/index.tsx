import React from 'react';
import { ICard } from '@models/ICard';

interface AddCardsDialogProps {
  allCards: ICard[];
  selectedCardIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onAddCards: () => void;
  onCardSelect: (cardId: string) => void;
  userCards: ICard[];
}

const AddCardsDialog: React.FC<AddCardsDialogProps> = ({
  allCards,
  selectedCardIds,
  isOpen,
  onClose,
  onAddCards,
  onCardSelect,
  userCards,
}) => {
  if (!isOpen) return null;

  const filteredCards = allCards.filter(card => !userCards.find(userCard => userCard.id === card.id && userCard.imageUrl));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black bg-opacity-75"></div>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg h-1/2 shadow-lg overflow-y-auto max-w-xl">
          <h1 className="mb-6 text-gray-800">Adicionar Cartas</h1>
          <div className="grid grid-cols-2 gap-4 mb-6 h-72 overflow-y-auto">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className={`relative p-2 rounded-lg border ${selectedCardIds.includes(card.id) ? 'border-indigo-500' : 'border-gray-300'
                  }`}
              >
                <img src={card.imageUrl} alt={card.name} className="w-full h-32 rounded-lg object-cover" />
                <div className="mt-2 text-center text-sm text-gray-800">{card.name}</div>
                <input
                  type="checkbox"
                  checked={selectedCardIds.includes(card.id)}
                  className="absolute top-2 left-2 w-4 h-4"
                  onChange={() => onCardSelect(card.id)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-auto">
            <button
              className="bg-indigo-600 px-3 py-2 rounded-md text-sm text-white font-semibold leading-6 text-gray-900 ml-4"
              onClick={onAddCards}
            >
              Adicionar
            </button>
            <button
              className="bg-gray-600 px-3 py-2 rounded-md text-sm text-white font-semibold leading-6 text-gray-900 ml-4"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardsDialog;
