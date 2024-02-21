import { Icon } from "./Icon"
import React from 'react';

export const FavoriteIcon = ({ className }) => {

    return (
        <span title="Wishlist" >
            <Icon i="favorite" className={className}/>
        </span>
    )
}
