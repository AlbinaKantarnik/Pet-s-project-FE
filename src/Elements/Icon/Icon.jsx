import React from 'react';
export const Icon = ({ i , className, onClick}) => {
    
    return (
        <span className={`material-symbols-outlined ${className}`} onClick={onClick}>
            {i}
        </span>
    );
};

