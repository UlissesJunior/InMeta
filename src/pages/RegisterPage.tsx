import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sign } from '../components/Sign';
import { Screen } from '../components/Screen';
import { register } from '../services/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string, nome?: string) => {
    try {
      await register(nome!, email, password);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Screen>
        <Sign mode={'register'} onSubmit={handleSubmit} />
    </Screen>
  );
};

export default LoginPage;
