import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="w-full bg-gray-100">
            <div className="max-w-[1170px] mx-auto">
                {children}
            </div>
        </div>
    );
};