import React from 'react';
export const Icon = ({ i , className}) => {
    
    return (
        <span className={`material-symbols-outlined ${className}`}>
            {i}
        </span>
    );
};

