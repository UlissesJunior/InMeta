import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// import CardsPage from './pages/CardsPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/cadastro' element={<RegisterPage />} />
      {/* <Route path="/cards" element={<CardsPage />} /> */}
    </Routes>
  );
};

export default App;
