import React, { useState } from 'react';
import { fetchPutUserEdit } from '../API/fetchServer';
import SaveMassage from '../Elements/Usefull/SaveMassage';

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

    const sendSaveRequest = async (data) => {
        try {
            const responseData = await fetchPutUserEdit(id_user, data);
            return responseData;
        } catch (error) {
            console.error('Error:', error.message);
            throw new Error('Error saving data. Please try again.');
        }
    };

    const handleSave = async () => {
        try {
            setSaveSuccess(false); // Сбросить состояние перед сохранением данных
            setSaveError('');     // Сбросить состояние перед сохранением данных

            const responseData = await sendSaveRequest(editUser);
            setUserData(responseData);
            setEditMode(false);
            setSaveSuccess(true); // Установить состояние при успешном сохранении
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
            setSaveError(error.message); // Установить состояние при ошибке сохранения
            setEditMode(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'phone_number' ? parseInt(value) : value;
        setEditUser(prevParams => ({
            ...prevParams,
            [name]: newValue
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
                        type="number"
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
