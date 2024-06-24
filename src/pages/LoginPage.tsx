import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sign } from '../components/Sign';
import { Screen } from '../components/Screen';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Screen>
        <Sign mode={'login'} onSubmit={handleSubmit} />
    </Screen>
  );
};

export default LoginPage;
