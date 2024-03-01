import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './page/Home'
import Search from './page/Search';
import Dashbord from './page/Dashbord';
import PetPage from './page/PetPage';
import MyPets from './page/MyPets';
import Profile from './page/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useUser } from './Context/UserContext';

function App() {

  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pets/:id_pet" element={<PetPage />} />
            <Route path='/mypets/:id_user' element={<MyPets />} />
            <Route path='/profile/:id_user' element={<Profile />} />
            <Route path="/dashbord" element={<Dashbord />} />
                    
          </Routes>  
        </Router>
      <Footer />
    </>
  )
}

export default App
