import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { GiCardPick, GiTrade } from "react-icons/gi";

export const Navbar: React.FC = ({}) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const page = window.location.pathname;
    console.log(page);

    return (
        <>
            <div className="w-full mx-auto h-[88px] bg-white absolute top-0 left-0 z-0"></div>
            <header className="bg-white relative">
                <nav
                    className="mx-auto flex max-w-7xl items-center z-50 justify-between p-6 px-8 z-50"
                    aria-label="Global"
                >
                    <div className="flex flex-1">
                        <GiCardPick className='h-10 w-auto cursor-pointer text-indigo-600 mr-4' onClick={() => navigate('/')} />
                    </div>
                    <div className="flex gap-x-12">
                        <div className="leading-6 text-gray-900 flex flex-row align-center items-center">
                            <p className='font-semibold text-lg'>Centro de Trocas</p> <GiTrade className="h-[40px] w-[40px] ml-4" />
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
                                    className="bg-indigo-600 px-3 py-2 rounded-md text-sm text-white font-semibold leading-6 text-gray-900 ml-4"
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
