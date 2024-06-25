import React, { useState, useEffect } from "react";
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from "../Sidebar";
import { FaHatWizard } from "react-icons/fa";
import { MdImageSearch } from "react-icons/md";

interface UserHeaderProps {
    children: React.ReactNode;
}

const UserHeader: React.FC<UserHeaderProps> = ({ children }) => {
    const [image, setImage] = useState("");
    const { user } = useAuth();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                setImage(imageDataUrl);
                if (user?.email) {
                    const userProfileImages = JSON.parse(localStorage.getItem("userProfileImages") || "{}");
                    const updatedUserProfileImages = {
                        ...userProfileImages,
                        [user.email]: imageDataUrl
                    };
                    localStorage.setItem("userProfileImages", JSON.stringify(updatedUserProfileImages));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (user?.email) {
            const userProfileImages = JSON.parse(localStorage.getItem("userProfileImages") || "{}");
            const userProfileImage = userProfileImages[user.email];
            if (userProfileImage) {
                setImage(userProfileImage);
            }
        }
    }, [user?.email]);

    return (
        <>
            <div className="w-full h-1/4 bg-indigo-500 absolute top-0 left-0 z-0"></div>
            <div className="w-full h-1/4 bg-indigo-500 mb-[10vh] flex justify-end items-center flex-col relative z-10">
                <div className="absolute right-2 top-2">
                    <Sidebar />
                </div>
                {image ? (
                    <img
                        src={image}
                        alt="User Profile"
                        className="w-[20vh] h-[18vh] z-50 bg-gray-700 absolute top-[65%] rounded-xl hover:z-0"
                    />
                ) : (
                    <FaHatWizard className="w-[20vh] h-[18vh] z-50 p-8 bg-gray-700 absolute top-[65%] rounded-xl hover:z-0" />
                )}
                <div className="w-[20vh] h-[18vh] flex justify-center items-center absolute top-[65%] opacity-60 rounded-xl hover:z-50">
                    <MdImageSearch
                        size={"80%"}
                        color="#fff"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full h-[18vh] opacity-0 absolute top-0 cursor-pointer"
                        onChange={handleImageUpload}
                    />
                </div>
            </div>
            <div className="w-full h-full text-2xl">
                <div className="p-4 pl-8 pr-8">
                    <h1 className="text-black font-medium">
                        Bem-Vindo,{" "}
                        <span className="text-indigo-500">{user?.name || "Usuário"}</span>
                    </h1>
                </div>
                <div className="max-h-[50%] flex">
                    <div className="p-4 pl-8 pr-8 overflow-y-auto w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHeader;
