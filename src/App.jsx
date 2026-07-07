import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/PlaceOrder/Orders";
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopUp/LoginPopup';

const App = () => {

  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : null}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>

      <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/cart' element={<Cart />} />
           <Route path='/order' element={<Orders />} />
         </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App

