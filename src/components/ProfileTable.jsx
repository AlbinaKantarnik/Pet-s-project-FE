import React, { useState } from 'react';
import { fetchPutUserEdit } from '../API/fetchServer';
import SaveMassage from '../Elements/Usefull/SaveMassage';
import { useUser } from '../Context/UserContext';

export default function ProfileTable({ id_user, userData, setUserData }) {
    const [editMode, setEditMode] = useState(false);
    const [editUser, setEditUser] = useState({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_number: userData.phone_number,
        password: userData.password,
        userbio: userData.userbio
    });
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');
    const { user, updateUserContext } = useUser();

    const sendSaveRequest = async (data) => {
        try {
            const responseData = await fetchPutUserEdit(id_user, data);
            return responseData.data;
        } catch (error) {
            console.error('Error:', error.message);
            // throw new Error('Error saving data. Please try again', error.message);
            throw error;
        }
    };
   
    const handleSave = async () => {
        try {
            setSaveSuccess(false);
            setSaveError('');
            const responseData = await sendSaveRequest(editUser);
            setUserData(responseData);
        
            if (user.user_id == id_user) {
                updateUserContext(responseData);
            }

            setEditMode(false);
            setSaveSuccess(true);
        } catch (error) {
            setEditUser({
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                phone_number: userData.phone_number,
                password: userData.password,
                userbio: userData.userbio
            });
            setSaveSuccess(false);
            setSaveError(error.message);
            setEditMode(false);
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
            <SaveMassage success={saveSuccess} error={saveError} />
            <div className='progileTable'>
                <h4>First name
                    <input
                        type="text"
                        name="first_name"
                        value={editUser.first_name}
                        onChange={handleInputChange}
                        disabled={!editMode} // Блокируем поле ввода, если не в режиме редактирования
                    /></h4>
                <h4>Last name
                    <input
                        type="text"
                        name="last_name"
                        value={editUser.last_name}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    /></h4>
                <h4>Password
                    <input
                        type="password"
                        name="password"
                        value={editUser.password}
                        // onChange={handleInputChange}
                        disabled={true}
                    /></h4>
                <h4>Phone
                    <input
                        type="text"
                        name="phone_number"
                        value={editUser.phone_number}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    /></h4>
                <h4>email
                    <input
                        type="email"
                        name="email"
                        value={editUser.email}
                        // onChange={handleInputChange}
                        disabled={true}
                    /></h4>
                <h4>Some bio
                    <textarea
                        type="text"
                        name="userbio"
                        value={editUser.userbio || ''}
                        onChange={handleInputChange}
                        placeholder="You can right short bio"
                        disabled={!editMode}
                    /></h4>
            </div>
            {/* Отображаем кнопку "Сохранить изменения" только в режиме редактирования */}
            {editMode && (
                <button onClick={handleSave}>Save changes</button>
            )}
            {/* Отображаем кнопку "Редактировать" только в режиме отображения данных */}
            {!editMode && (
                <button onClick={() => setEditMode(true)}>Edit profile</button>
            )}
        </>

    )
}
