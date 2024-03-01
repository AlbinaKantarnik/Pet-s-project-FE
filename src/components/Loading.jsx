import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Loading() {
    const navigation = useNavigate();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            
            navigation('/');
          }, 7000); 
      
          return () => clearTimeout(timeoutId); 
        }, []); 
    

    return (
        <>
            <div className='Loading'>
                Loading...
                <img src='/loading2.jpg' alt='Loading...' />
            </div>
        </>
    )
}