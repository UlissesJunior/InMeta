import React, { useState } from 'react';
import { GiCardPick } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

interface SignProps {
    mode: 'login' | 'register';
    onSubmit: (email: string, password: string, name?: string) => void;
}

export const Sign: React.FC<SignProps> = ({ mode, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (mode=='register' && !passwordRegex.test(password)) {
            toast.info('A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.', {
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
            return;
        }

        if (mode === 'register') {
            onSubmit(email, password, name);
        } else {
            onSubmit(email, password);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <GiCardPick className='mx-auto h-12 w-auto text-indigo-600' />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {mode === 'login' ? 'Faça o Login em sua conta' : 'Registre-se em nossa plataforma'}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Endereço de email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Senha
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {mode === 'login' ? 'Login' : 'Registrar-se'}
                        </button>
                    </div>
                </form>

                {mode === 'login' ? (
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Não tem uma conta?{' '}
                        <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => navigate("/cadastro")}>
                            Registre-se
                        </a>
                    </p>
                ) : (
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Já tem uma conta?{' '}
                        <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => navigate("/login")}>
                            Entre
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
};
