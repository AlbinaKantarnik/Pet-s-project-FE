import React from 'react';
import axios from "axios";
const URL = 'http://localhost:3000/';

// PETS ///////////////////////////////////////////
export const fetchPostNewPet = async (newPet) => {
    try {
        const data = await axios.post(`${URL}pets/add`, newPet);
        return data
    } catch (error) {
        alert("Oops, we couldn't add this pet")
        console.error('Error server:', error.message);
    }
};

export const fetchGetPetById = async (id_pet) => {
    try {
        const { data } = await axios.get(`${URL}pets/id/:${id_pet}`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchPutPetEdit = async (id_pet) => {
    try {
        const { data } = await axios.put(`${URL}pets/:${id_pet}`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchPutPetAdopt = async (id_pet) => {
    try {
        const { data } = await axios.put(`${URL}pets/:${id_pet}/adopt`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchDeletePetReturn = async (id_pet) => {
    try {
        const { data } = await axios.delete(`${URL}pets/:${id_pet}/return`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchPutPetSave = async (id_pet) => {
    try {
        const { data } = await axios.put(`${URL}pets/:${id_pet}/save`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};
// сделать в беке
export const fetchGetPetsSaved = async (id_user) => {
    try {
        const { data } = await axios.put(`${URL}pets/saved/:${id_user}`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchDeletePetUnsave = async (id_pet) => {
    try {
        const { data } = await axios.delete(`${URL}pets/:${id_pet}/unsave`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchGetPetSearch = async (searchTypePet) => {
    try {
        const { data } = await axios.get(`${URL}pets/search/${searchTypePet.type}`);
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return [];
    }
};

export const fetchGetPetSearchAll = async (searchPetsAll) => {
    try {
        const { data } = await axios.get(`${URL}pets/search_all`, {
            params: searchPetsAll
        });
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

export const fetchGetMyPets = async (id_user) => {
    try {
        const { data } = await axios.get(`${URL}pets/user/:${id_user}`)
        return data;
    } catch (error) {
        console.error('Error server:', error.message);
        return []
    }
};

// export const fetchGetTweet = async (page) => {

//     try {
//       const {data} = await axios.get(URL+`tweets?sortBy=date&order=desc&page=${page}&limit=5`)
//         return data;
//     } catch (error) {
//       console.error('Error server:', error.message);
//       return []
//     }
// };
// export const fetchGetNumberTweet = async() => {
//   try {
//     const responseNumber = await axios.get(URL+'tweets?sortBy=date&order=desc&page=1&limit=1')
//     if (responseNumber.data.length > 0) {
//       const tweetNumber = responseNumber.data[0].tweet_number;
//       return tweetNumber;
//     } else {
//       return null;
//     }
//   } catch (error){
//     console.error('Error server:', error.message);
//     return []
//   }
// }

// USER ///////////////////////////////////////////
export const fetchPostNewUser = async (newUser) => {
    try {
        const data = await axios.post(`${URL}users/singup`, newUser);
        return data
    } catch (error) {
        alert("Oops, we couldn't add you")
        console.error('Error server:', error.message);
    }
};
/// ДОДЕЛАТЬ!!!!!!! ....... ////////
export const fetchPostUserLogin = async (User) => {
    try {
        const data = await axios.post(`${URL}users/login`, User);
        return data
    } catch (error) {
        alert("Oops, we couldn't login you")
        console.error('Error server:', error.message);
    }
};
/// ДОДЕЛАТЬ!!!!!!! ....... ////////
export const fetchPostUserLogout = async (User) => {
    try {
        const data = await axios.post(`${URL}users/logout`, User);
        return data
    } catch (error) {
        alert("Oops, we couldn't logout you")
        console.error('Error server:', error.message);
    }
};

export const fetchGetUserById = async (id_user) => {
    try {
        const data = await axios.get(`${URL}users/:${id_user}`);
        return data
    } catch (error) {
        alert("Oops, we couldn't find this user")
        console.error('Error server:', error.message);
    }
};

export const fetchPutUserEdit = async (id_user, editUser) => {
    try {
        const data = await axios.put(`${URL}users/:${id_user}`, editUser);
        return data
    } catch (error) {
        alert("Oops, we couldn't change this user")
        console.error('Error server:', error.message);
    }
};

export const fetchGetUserAll = async () => {
    try {
        const response = await axios.get(`${URL}users`);
        return response.data
    } catch (error) {
        alert("Oops, we couldn't find all users")
        console.error('Error server:', error.message);
    }
};
export const fetchGetPetsAll = async () => {
    try {
        const response = await axios.get(`${URL}pets`);
        return response.data
    } catch (error) {
        alert("Oops, we couldn't find all pets")
        console.error('Error server:', error.message);
    }
};