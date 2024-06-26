import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { GiCardPick, GiCardPlay, GiTrade } from "react-icons/gi";
import { MdFavorite, MdHistory } from "react-icons/md";

export const Navbar: React.FC = ({}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const page = location.pathname;

    const getIconForPage = () => {
        switch (page) {
            case '/favoritos':
                return (
                    <>
                        <p className='font-semibold text-lg text-gray-900'>Meus Favoritos</p>
                        <MdFavorite className='h-10 w-auto cursor-pointer text-gray-900 ml-4' />
                    </>
                );
            case '/historicodetrocas':
                return (
                    <>
                        <p className='font-semibold text-lg text-gray-900'>Histórico de Trocas</p>
                        <MdHistory className='h-10 w-auto cursor-pointer text-gray-900 ml-4' onClick={() => navigate('/')} />
                    </>
                );
            case '/minhastrocas':
                return (
                    <>
                        <p className='font-semibold text-lg text-gray-900'>Minhas Trocas</p>
                        <GiCardPlay className='h-10 w-auto cursor-pointer text-gray-900 ml-4' onClick={() => navigate('/')} />
                    </>
                );
            default:
                return (
                    <>
                        <p className='font-semibold text-lg text-gray-900'>Centro de Trocas</p>
                        <GiTrade className='h-10 w-auto cursor-pointer text-gray-900 ml-4' onClick={() => navigate('/')} />
                    </>
                );
        }
    };

    return (
        <>
            <div className="w-full mx-auto h-[88px] bg-white absolute top-0 left-0 z-0"></div>
            <header className="bg-white relative">
                <nav
                    className="mx-auto flex max-w-7xl items-center z-50 justify-between p-6 px-8"
                    aria-label="Global"
                >
                    <div className="flex flex-1">
                        <GiCardPick className='h-10 w-auto cursor-pointer text-indigo-600 mr-4' onClick={() => navigate('/')} />
                    </div>
                    <div className="flex gap-x-12">
                        <div className="leading-6 flex flex-row align-center items-center">
                            {getIconForPage()}
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end">
                        {user ? (
                            <>
                                <Sidebar isHome={true} />
                            </>
                        ) : (
                            <>
                                <button
                                    className="px-3 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900 ml-4"
                                    onClick={() => navigate('/login')}
                                >
                                    Log in
                                </button>
                                <button
                                    className="bg-indigo-600 px-3 py-2 rounded-md text-sm text-white font-semibold leading-6 ml-4"
                                    onClick={() => navigate('/cadastro')}
                                >
                                    Registre-se
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};
