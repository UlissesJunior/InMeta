import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaHatWizard } from "react-icons/fa";

interface SidebarProps {
    isHome?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isHome }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        if (user?.email) {
            const userProfileImages = JSON.parse(localStorage.getItem("userProfileImages") || "{}");
            const userProfileImage = userProfileImages[user.email];
            if (userProfileImage) {
                setProfileImage(userProfileImage);
            }
        }
    }, [user]);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {profileImage ? (
                <img
                    onClick={toggleSidebar}
                    className={`${isHome ? 'h-10' : 'h-12'} ${isHome ? 'w-10' : 'w-12'} rounded-full cursor-pointer`}
                    src={profileImage}
                    alt="Profile"
                />
            ) : (
                <FaHatWizard className={`w-${isHome ? 8 : 12} h-${isHome ? 8 : 12} rounded-full cursor-pointer`} onClick={toggleSidebar} />
            )}
            {isOpen && (
                <div className="fixed right-0 top-0 z-50 h-screen w-[320px] bg-indigo-600 text-white p-4 flex flex-col justify-between rounded-tl-lg rounded-bl-lg">
                    <div>
                        <div className="mb-4">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                alt=""
                            />
                        </div>
                        <ul className="space-y-4">
                            <li
                                className="cursor-pointer hover:bg-indigo-700 p-2 rounded-md text-bold"
                                onClick={() => {
                                    navigate('/');
                                    toggleSidebar();
                                }}
                            >
                                Centro de Trocas
                            </li>
                            <li
                                className="cursor-pointer hover:bg-indigo-700 p-2 rounded-md text-bold"
                                onClick={() => {
                                    navigate('/cards');
                                    toggleSidebar();
                                }}
                            >
                                Minhas Cartas
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center space-x-4 mt-6">
                        <img
                            className="h-12 w-12 rounded-full"
                            src={profileImage || 'default-profile.png'}
                            alt="User"
                        />
                        <div>
                            <p className="font-semibold">{user?.name}</p>
                            <button
                                onClick={() => {
                                    logout();
                                    toggleSidebar();
                                    navigate('/');
                                }}
                                className="mt-2 px-3 py-1 bg-red-500 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Sidebar;
