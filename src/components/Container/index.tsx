import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    height?: boolean;
    blocked?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, height, blocked }) => {
    return (
        <div className={`w-full bg-gray-100 ${height ? 'h-screen' : ''} ${blocked ? 'overflow-hidden' : ''}`}>
            <div className={`max-w-[1170px] mx-auto ${height ? 'h-full' : ''}`}>
                {children}
            </div>
        </div>
    );
};
