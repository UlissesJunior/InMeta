import React from 'react';
import { ICard } from '@models/ICard';

interface AddCardsDialogProps {
  allCards: ICard[];
  selectedCardIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onAddCards: () => void;
  onCardSelect: (cardId: string) => void;
}

const AddCardsDialog: React.FC<AddCardsDialogProps> = ({
  allCards,
  selectedCardIds,
  isOpen,
  onClose,
  onAddCards,
  onCardSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black bg-opacity-75"></div>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg  h-1/2 shadow-lg overflow-y-auto">
          <h1 className=" mb-6 text-gray-800">Adicionar Cartas</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {allCards
              .filter((card) => card.imageUrl) // Filter out cards without an image
              .map((card) => (
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
          <div className="flex justify-end">
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded mr-2 hover:bg-indigo-600 focus:outline-none"
              onClick={onAddCards}
            >
              Adicionar
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardsDialog;
