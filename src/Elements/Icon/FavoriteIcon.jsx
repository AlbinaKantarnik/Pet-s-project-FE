import { Icon } from "./Icon"
import React from 'react';

export const FavoriteIcon = ({ className, onClick }) => {

    return (
        <span title="Wishlist" >
            <Icon i="favorite" className={className} onClick={onClick}/>
        </span>
    )
}
