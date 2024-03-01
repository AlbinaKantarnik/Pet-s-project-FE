import { Icon } from "./Icon"
import React from 'react';

export const TimeIcon = ({ className, onClick}) => {

    return (
        <span title="Foster">
            <Icon i="hourglass_top" className={className} onClick={onClick}/>
        </span>
    )
}
