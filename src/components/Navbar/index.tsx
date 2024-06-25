import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

export const Navbar: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full mx-auto h-[88px] bg-white absolute top-0 left-0 z-0"></div>
            <header className="bg-white relative">
                <nav
                    className="mx-auto flex max-w-7xl items-center z-50 justify-between p-6 lg:px-8 z-50"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <p className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/cards')}>
                            Favoritos
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            Marketplace
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            Company
                        </p>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
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
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};
