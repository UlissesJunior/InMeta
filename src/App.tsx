import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CardsPage from './pages/CardsPage';
import FavoritesPage from './pages/FavoritesPage';
import TradeHistoryPage from './pages/TradeHistory';
import RegisterPage from './pages/RegisterPage';
import 'react-toastify/dist/ReactToastify.css';
import UserTradesPage from './pages/UserTradesPage';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/historicodetrocas" element={<TradeHistoryPage />} />
          <Route path="/minhastrocas" element={<UserTradesPage />} />          
        </Routes>
    </>
  );
};

export default App;
