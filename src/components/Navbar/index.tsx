import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="bg-white">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
                {/* <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div> */}
                <div className="hidden lg:flex lg:gap-x-12">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        Favoritos
                    </p>
                    <p  className="text-sm font-semibold leading-6 text-gray-900">
                        Marketplace
                    </p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        Company
                    </p>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <>
                            <span className="text-sm font-semibold leading-6 text-gray-900">
                                Welcome, {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="text-sm font-semibold leading-6 text-gray-900 ml-4"
                            >
                                Logout
                            </button>
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
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
