import React from 'react';
import './PetCard.css'
import { AdoptIcon } from '../Elements/Icon/AdoptIcon';
import { TimeIcon } from '../Elements/Icon/TimeIcon';
import { FavoriteIcon } from '../Elements/Icon/FavoriteIcon';


export default function PetCard({petData}) {

    return (
        <>
            <div className='Container'>
                <div className='Card' style={{ width: '16rem' }}>
                    <div className='CardTitle'><h4>My name is {petData.name }</h4></div>
                    <div className='CardImg' style={{ backgroundImage: `url(${petData.picture})` }}/>
                    <div className='CardBody'>
                        <div className='CardText' >
                            <h5>I'm a {petData.type}</h5>
                            <h5>Height: { petData.height} sm</h5>
                            <h5>Weight: { petData.weight} kg</h5>
                        </div>
                        <button>Learn more</button>
                        <div className='IconCard'>
                            <AdoptIcon/> <TimeIcon/><FavoriteIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}