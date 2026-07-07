import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home"); /**Component ke andar data store karna
Aur jab data change ho → UI automatically update ho jaye. */

const [user, setUser] = useState(null);
const [showProfile, setShowProfile] = useState(false);

const handleLogin = () => {
  const userData = {
    email: "test@gmail.com",
    password: "1234"
  };
  setUser(userData);
};
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
        <ul className="navbar-menu">
          <Link to='/' onClick={()=>setMenu("home")} className={menu=="home"?"active":""}><b>Home</b></Link>
          <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu=="menu"?"active":""}><b>Menu</b></a>
          <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu=="mobile-app"?"active":""}><b>Mobile App</b></a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu=="contact-us"?"active":""}><b>Contact Us</b></a>
        </ul>
        <div className='navbar-right'>

          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className="dot">
            </div>
            
          </div>
          {user ? (
          <div className="profile" onClick={()=>setShowProfile(!showProfile)}>
            👤 {user.email}
          </div>
        ) : (
          <button onClick={()=>setShowLogin(true)}>sign-In</button>
        )}


        {showProfile && user && (
          <div className="profile-dropdown">
            <p>My Profile</p>
            <p>Orders</p>
            <p onClick={() => setUser(null)}>Logout</p>
          </div>
        )}
        </div>
    </div>
  )
}

export default Navbar
