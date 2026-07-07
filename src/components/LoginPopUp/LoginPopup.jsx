import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

  const [currState,setCurrState]=useState("Login")

  useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto";
  };
}, []);
  return (
    <div className='login-popup'>
      <form  className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input type="text" placeholder='your name' required/>}
          
          <input type="email" placeholder='your email' required/>
          <input type="password" placeholder='your password' required/>
        </div>
        <button>{currState==="Sign up"? "Create account":"login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing ,i agree to the terms of use and privacy policy.</p>
        </div>
        {currState==="Login"?
           <p>Create a new account?<span  onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account<span  onClick={()=>setCurrState("Login")}>Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopup
