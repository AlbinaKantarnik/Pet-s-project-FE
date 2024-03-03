import React, { useEffect, useState } from 'react';
import './Singup.css'
import SaveMassage from '../../Elements/Usefull/SaveMassage';
import { fetchPostUserLogin } from '../../API/fetchServer';
import { useUser } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';


export default function Login({ isOpen, onRequestClose }) {
    const [UserLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [error, setError] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const {updateUserContext} = useUser();

    const newUserLogin = {
        email: UserLogin.email.toLowerCase(),
        password: UserLogin.password,
    };

    useEffect(() => {
        // Сбросить состояние при открытии модального окна
        if (isOpen) {
            setUserLogin({
                email: '',
                password: ''
            });
            setSaveSuccess(false);
            setSaveError('');
            setError({
                email: '',
                password: ''
            });
        }
    }, [isOpen]);

    const handleUserLoginChange = (e) => {
        const { name, value } = e.target;
        const newError = { ...error }; 

        if (name === 'password') {
            newError[name] = value.length < 8 ? 'Password is too short. It must be at least 8 characters long' : '';
        }

        if (name === 'email') {
            newError[name] = value.length < 5 ? 'Please enter a valid email address' : '';
        }

        setUserLogin(prevUser => ({
            ...prevUser,
            [name]: value
        }));

        setError(newError);
    };

    const handleAddUserLogin = async () => {
        // Проверяем, есть ли пустые значения в форме
        if (Object.values(UserLogin).some(value => value === '')) {
            // Если есть пустые значения в форме, устанавливаем ошибки для всех полей
            const newError = {};
            Object.keys(UserLogin).forEach(key => {
                if (UserLogin[key] === '') {
                    newError[key] = 'This field is required';
                }
            });
            setError(newError);
            return;
        }
        try {
            setSaveSuccess(false); // Сбросить состояние перед сохранением данных
            setSaveError('');
            const responseData = await fetchPostUserLogin(newUserLogin);
            
            if (responseData.status === 200) {
                localStorage.setItem('accessToken', responseData.data.token);
                // const expirationDate = new Date();
                // expirationDate.setDate(expirationDate.getDate() + 30);
                // document.cookie = `accessToken=${responseData.token}; expires=${expirationDate.toUTCString()}; path=/`;
                // document.cookie = `accessToken=${responseData.data.token}; expires=${expirationDate.toUTCString()}; path=/`;
                updateUserContext(responseData.data.infoUser);
                setSaveSuccess(true)
                onRequestClose();
                navigate('/');
                
            } else {
                setSaveSuccess(false);
                setSaveError('Error !!!: ', responseData.message);
            }
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
                <label><h2>Login</h2></label>
                <h4>Email</h4>
                <input
                    type="email"
                    name="email"
                    value={UserLogin.email}
                    onChange={handleUserLoginChange}
                />
                {error.email && <div className='error'>{error.email}</div>}

                <h4>Password</h4>
                <input
                    type="password"
                    name="password"
                    value={UserLogin.password}
                    placeholder='8 or more characters'
                    onChange={handleUserLoginChange}
                />
                {error.password && <div className='error'>{error.password}</div>}

                <div className='singupTable__btn'>
                    <button onClick={handleAddUserLogin} type='button'>{'Log in'}</button>
                </div>
            </div>
        </div>
    )
}