import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sign } from '../components/Sign';
import { Screen } from '../components/Screen';
import { register } from '../services/authService';
import { Slide, toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string, nome?: string) => {
    try {
      await register(nome!, email, password);
      toast.success('Logado com sucesso!', {
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
      navigate('/login');
    } catch (error) {
      toast.info('Falha ao registrar-se!', {
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
    <Screen>
      <Sign mode={'register'} onSubmit={handleSubmit} />
    </Screen>
  );
};

export default LoginPage;
