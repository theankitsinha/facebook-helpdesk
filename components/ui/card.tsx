import React from "react";

const Card = ({children, className}: { children: React.ReactNode, className: string }) => {
    return (
        <div
            className={`p-10 px-14 bg-white w-fit h-fit rounded-lg overflow-hidden ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;