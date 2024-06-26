import React, { useEffect, useState } from 'react';
import { getAllTrades, createTrade } from '../services/tradeService';
import { getUserCards, getAllCards } from '../services/cardService';
import { useAuth } from '../contexts/AuthContext';
import { ITrade } from '@models/ITrade';
import { ICard } from '@models/ICard';
import { Navbar } from '../components/Navbar';
import { Container } from '../components/Container';
import Trade from '../components/Trade';
import ReceivingCardsDialog from '../dialogs/ReceivingCardsDialog';
import OfferingCardsDialog from '../dialogs/OfferingCardsDialog';
import { Slide, toast } from 'react-toastify';

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const [trades, setTrades] = useState<ITrade[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [receivingDialogOpen, setReceivingDialogOpen] = useState(false);
  const [offeringDialogOpen, setOfferingDialogOpen] = useState(false);
  const [userCards, setUserCards] = useState<ICard[]>([]);
  const [allCards, setAllCards] = useState<ICard[]>([]);
  const [receivingCardIds, setReceivingCardIds] = useState<string[]>([]);
  const [offeringCardIds, setOfferingCardIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const newTrades = await getAllTrades(20, currentPage);
      setTrades((prevTrades) => [...prevTrades, ...newTrades]);
    };

    fetchTrades();
  }, [currentPage]);

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

  const handleReceivingCardSelect = (cardId: string) => {
    setReceivingCardIds((prevSelected) =>
      prevSelected.includes(cardId)
        ? prevSelected.filter((id) => id !== cardId)
        : [...prevSelected, cardId]
    );
  };

  const handleOfferingCardSelect = (cardId: string) => {
    setOfferingCardIds((prevSelected) =>
      prevSelected.includes(cardId)
        ? prevSelected.filter((id) => id !== cardId)
        : [...prevSelected, cardId]
    );
  };

  const handleAddReceivingCards = () => {
    setReceivingDialogOpen(false);
    setOfferingDialogOpen(true);
  };

  const handleAddOfferingCards = async () => {
    setOfferingDialogOpen(false);
    try {
      if (!token) {
        throw new Error('Token de autenticação não disponível.');
      }
  
      const receivingCards = receivingCardIds.map(id => ({ cardId: id, type: 'RECEIVING' as const }));
      const offeringCards = offeringCardIds.map(id => ({ cardId: id, type: 'OFFERING' as const }));
      const cards = [...receivingCards, ...offeringCards];
  
      await createTrade(cards, token);
      setReceivingCardIds([]);
      setOfferingCardIds([]);
  
      toast.success('Troca criada com sucesso!', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
  
      const updatedTrades = await getAllTrades(20, 1); // Recarregar a primeira página de trocas
      setTrades(updatedTrades);
    } catch (error) {
      toast.error('Erro ao criar troca!', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };
  
  return (
    <>
      <Navbar />
      <Container>
        <div className="flex flex-col p-8 relative">
          <div className="fixed right-4 bottom-4">
            {token && (
              <button
                className="z-40 bg-indigo-600 px-3 py-2 rounded-md text-sm text-white font-semibold leading-6 text-gray-900"
                onClick={() => setReceivingDialogOpen(true)}
              >
                Nova Troca
              </button>
            )}
          </div>
          {trades.map((trade) => (
            <Trade key={trade.id} trade={trade} />
          ))}
        </div>
      </Container>
      <div id="sentinela"></div>

      <OfferingCardsDialog
        userCards={userCards}
        selectedCardIds={offeringCardIds}
        isOpen={offeringDialogOpen}
        onClose={() => setOfferingDialogOpen(false)}
        onAddCards={handleAddOfferingCards}
        onCardSelect={handleOfferingCardSelect}
        receivingCardIds={receivingCardIds}
      />

      <ReceivingCardsDialog
        allCards={allCards}
        selectedCardIds={receivingCardIds}
        isOpen={receivingDialogOpen}
        onClose={() => setReceivingDialogOpen(false)}
        onAddCards={handleAddReceivingCards}
        onCardSelect={handleReceivingCardSelect}
        userCards={userCards}
      />

    </>
  );
};

export default HomePage;
