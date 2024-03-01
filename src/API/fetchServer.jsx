import React from 'react';
import axios from "axios";
const URL = 'http://localhost:3000/';

// PETS ///////////////////////////////////////////
export const fetchPostNewPet = async (newPet) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const {data} = await axios.post(`${URL}pets/add`, newPet, {headers: {Authorization: headersAuthorization}})
        return data
    } catch (error) {
        console.error('Error server:', error.message);
        throw error;
    }
};

export const fetchGetPetById = async (id_pet) => {
    try {
        const { data } = await axios.get(`${URL}pets/id/${id_pet}`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchPutPetEdit = async (id_pet, editPet) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.put(`${URL}pets/${id_pet}`, editPet, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server PutPetEdit:', error.message);
        return []
    }
};

export const fetchPutPetAdopt = async (id_pet) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.put(`${URL}pets/${id_pet}/adopt`, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchDeletePetReturn = async (id_pet) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.delete(`${URL}pets/${id_pet}/return`, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchPutPetSave = async (id_pet) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.put(`${URL}pets/${id_pet}/save`, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchGetPetsSaved = async (id_user) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.put(`${URL}pets/saved/${id_user}`, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchDeletePetUnsave = async (id_pet) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.delete(`${URL}pets/${id_pet}/unsave`, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchGetPetSearch = async (searchTypePet) => {
    try {
        const { data } = await axios.get(`${URL}pets/search/${searchTypePet}`);
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        // return [];
        throw error
    }
};

export const fetchGetPetSearchAll = async (searchPetsAll, offset) => {
    try {
        const { data } = await axios.get(`${URL}pets/search_all`, {
            params: { ...searchPetsAll, offset }
        });
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        // return []
        throw error
    }
};

export const fetchGetMyPets = async (id_user) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.get(`${URL}pets/user/${id_user}`, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        // return []
        throw error
    }
};

export const fetchGetMySavedPets = async (id_user) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const { data } = await axios.get(`${URL}pets/saved/user/${id_user}`, {headers: {Authorization: headersAuthorization}})
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchGetTypesPet = async () => {
    try {
        const { data } = await axios.get(`${URL}pets/type`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        // return []
        throw error
    }
};

// USER ///////////////////////////////////////////
export const fetchPostNewUser = async (newUser) => {
    try {
        const data =  await axios.post(`${URL}users/signup`, newUser);
        console.log('data backend', data.data)
        return data.data
    } catch (error) {
        throw error.response.data.message;
    }
};

export const fetchPostUserLogin = async (newUserLogin) => {
    try {
        const data = await axios.post(`${URL}users/login`, newUserLogin);
        return data
    } catch (error) {
        throw error.response.data.message;
    }
};

export const fetchPostUserLogout = async () => {
    try {
        const response = await axios.post(`${URL}users/logout`, {}, {
            withCredentials: true // Включить передачу куки
        });
        return response.data;
    } catch (error) {
        // console.error('Error server:', error.message);
        throw error.response.data.message;
    }
};

export const fetchGetUserById = async (id_user) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const {data }= await axios.get(`${URL}users/${id_user}`, {headers: {Authorization: headersAuthorization}});
        return data
    } catch (error) {
        throw error.response.data.message;
    }
};

export const fetchPutUserEdit = async (id_user, editUser) => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const data = await axios.put(`${URL}users/${id_user}`, editUser, {headers: {Authorization: headersAuthorization}});
        return data.data
    } catch (error) {
        console.error('Error server 3:', error);
        throw error;
    }
};

export const fetchGetUserAll = async () => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const response = await axios.get(`${URL}users`, {headers: {Authorization: headersAuthorization}});
        return response.data
    } catch (error) {
        alert("Oops, we couldn't find all users")
        console.error('Error server:', error.message);
        return []
    }
};
export const fetchGetPetsAll = async () => {
    const headersAuthorization = `Bearer ${localStorage.getItem('accessToken')}`
    try {
        const response = await axios.get(`${URL}pets`, {headers: {Authorization: headersAuthorization}});
        return response.data
    } catch (error) {
        alert("Oops, we couldn't find all pets")
        console.error('Error server:', error.message);
    }
};