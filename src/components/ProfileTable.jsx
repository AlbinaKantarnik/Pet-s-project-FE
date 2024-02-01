import React, { useState } from 'react';
import { fetchPutUserEdit } from '../API/fetchServer';

export default function ProfileTable() {
    
    const [editUser, setEditUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        userbio: ''
    })

    const handleSave = async () => {
        try {
            const responseData = await fetchPutUserEdit(id_user, editUser);
            console.log('Server response:', responseData);

        } catch (error) {
            console.error('Error:', error.message);

        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditUser(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };


    return (
        <>
            <div className='progileTable'>
                <h4>First name
                    <input
                        type="text"
                        name="first_name"
                        value={editUser.first_name}
                        onChange={handleInputChange}
                        placeholder=""
                    /></h4>
                <h4>Last name
                    <input
                        type="text"
                        name="last_name"
                        value={editUser.last_name}
                        onChange={handleInputChange}
                        placeholder=""
                    /></h4>
                <h4>Password
                    <input
                        type="text"
                        name="password"
                        value={editUser.password}
                        onChange={handleInputChange}
                        placeholder=""
                    /></h4>
                <h4>Phone 
                    <input
                        type="number"
                        name="phone_number"
                        value={editUser.phone_number}
                        onChange={handleInputChange}
                        placeholder="+972 000 00 0000"
                    /></h4>
                <h4>email
                    <input
                        type="text"
                        name="email"
                        value={editUser.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                    /></h4>
                <h4>Some bio
                    <textarea
                        type="text"
                        name="userbio"
                        value={editUser.userbio}
                        onChange={handleInputChange}
                        placeholder="You can right short bio"
                    /></h4>
            </div>
            <button onClick={handleSave}>Save changes</button>
        </>
    )
}
