import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Link, Route, Navigate, Routes } from "react-router-dom";
import Home from './page/Home'
import Search from './page/Search';
import Dashbord from './page/dashbord';
import PetPage from './page/PetPage';
import MyPets from './page/MyPets';
import Profile from './page/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {


  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/pets/:id_pet" element={<PetPage />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
