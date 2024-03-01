import React, { useEffect, useState } from 'react';
import './Singup.css'
import SaveMassage from '../../Elements/Usefull/SaveMassage';
import { fetchPostNewUser } from '../../API/fetchServer';
import { useNavigate } from 'react-router-dom';

export default function Singup({ isOpen, onRequestClose }) {
    const [User, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        repeat_password: ''
    });
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [error, setError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        repeat_password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Сбросить состояние при открытии модального окна
        if (isOpen) {
            setUser({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                password: '',
                repeat_password: ''});
            setSaveSuccess(false);
            setSaveError('');
            setError({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                password: '',
                repeat_password: ''
            });
        }
    }, [isOpen]);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        const newError = { ...error }; // Копируем текущий объект ошибок

        if (name === 'first_name' && name === 'last_name') {
            newError[name] = value.length < 1 ? 'Please enter your full name' : '';
        }

        if (name === 'password') {
            newError[name] = value.length < 8 ? 'Password is too short. It must be at least 8 characters long' : '';
        }

        if (name === 'repeat_password') {
            newError[name] = User.password !== value ? 'Passwords do not match' : '';
        }

        if (name === 'phone_number') {
            newError[name] = value.length < 9 ? 'Phone number is too short. It must be at least 9 characters long' : '';
        }

        if (name === 'email') {
            newError[name] = value.length < 5 ? 'Please enter a valid email address' : '';
        }

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));

        setError(newError);
    };

    const handleAddNewUser = async () => {
        // Проверяем, есть ли пустые значения в форме
        if (Object.values(User).some(value => value === '')) {
            // Если есть пустые значения в форме, устанавливаем ошибки для всех полей
            const newError = {};
            Object.keys(User).forEach(key => {
                if (User[key] === '') {
                    newError[key] = 'This field is required';
                }
            });
            setError(newError);
            return;
        }
        const newUser = {
            first_name: User.first_name.charAt(0).toUpperCase() + User.first_name.slice(1),
            last_name: User.last_name.charAt(0).toUpperCase() + User.last_name.slice(1),
            email: User.email.toLowerCase(),
            phone_number: User.phone_number,
            password: User.password,
        };

        try {
            setSaveSuccess(false); // Сбросить состояние перед сохранением данных
            setSaveError(''); 
            const responseData = await fetchPostNewUser(newUser);
            if (responseData.status === 200 || responseData.status === 201) {
                setSaveSuccess(true);
                onRequestClose();
                navigate('/');
            }
            // else if (responseData.status === 400 || responseData.status === 500) {
            //     setSaveSuccess(false);
            //     console.log('1111 error:', error);
            //     setSaveError('Error: ' +responseData.message);}
            return responseData;
        } catch (error) {
            setSaveSuccess(false);
            setSaveError(error);
            
        }
    };
    
    return (
            <div className='singup'>
                <SaveMassage success={saveSuccess} error={saveError} />
                <div className='singupTable'>
                    <label><h2>Registration</h2></label>
                    
                        <h4>What is your name?</h4>
                        <div className='singupTable_name'>
                        <input
                            type="text"
                            name="first_name"
                            value={User.first_name}
                            placeholder='First name'
                            onChange={handleUserChange}
                        />
                        {error.first_name && <div className='error'>{error.first_name} </div>}

                        <input
                            type="text"
                            name="last_name"
                            value={User.last_name}
                            placeholder='Last name'
                            onChange={handleUserChange}
                        />
                        {error.last_name && <div className='error'> { error.last_name}</div>}
                    </div>
                    
                    <h4>Create password</h4>
                    <input
                        type="password"
                        name="password"
                        value={User.password}
                        placeholder='8 or more characters'
                        onChange={handleUserChange}
                    />
                     {error.password && <div className='error'>{error.password}</div>}
                    <h4>Repeat password</h4>
                    <input
                        type="password"
                        name="repeat_password"
                        value={User.repeat_password}
                        placeholder='Write your password again'
                        onChange={handleUserChange}
                    />
                    {error.repeat_password && <div className='error'>{error.repeat_password}</div>}
                    <h4>Phone number</h4>
                    <input
                        type="text"
                        name="phone_number"
                        value={User.phone_number}
                        onChange={handleUserChange}
                    />
                     {error.phone_number && <div className='error'>{error.phone_number}</div>}
                    <h4>Email</h4>
                    <input
                        type="email"
                        name="email"
                        value={User.email}
                        onChange={handleUserChange}
                    />
                    {error.email && <div className='error'>{error.email}</div>}
                    <div className='singupTable__btn'>
                        <button onClick={handleAddNewUser} type='button'>{'Sign up'}</button>
                    </div>
                </div>

            </div>
    )
}