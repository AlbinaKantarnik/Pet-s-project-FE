import { Icon } from "./Icon"
import React from 'react';

export const AdoptIcon = ({ className, onClick }) => {
    return (
        <span title="Adopt" >
            <Icon i="sound_detection_dog_barking" className={className} onClick={onClick} />
        </span>
    );
};