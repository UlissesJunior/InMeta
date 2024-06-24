import React from "react";

interface ScreenProps {
    children: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children }) => {
    return (
        <div className="w-screen h-screen">
                {children}
        </div>
    );
};