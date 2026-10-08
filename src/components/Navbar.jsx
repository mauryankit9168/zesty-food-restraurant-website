import React, { useState, useContext, useRef, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { 
  FiSearch, 
  FiShoppingBag, 
  FiUser, 
  FiBox, 
  FiLogOut, 
  FiChevronDown 
} from 'react-icons/fi'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home")
  const [showProfile, setShowProfile] = useState(false)
  const dropdownRef = useRef(null)

  const {
    isLoggedIn,
    user,
    logout,
    getTotalCartAmount
} = useContext(StoreContext)

  const handleLogout = () => {
    logout()
    setShowProfile(false)
  }

  // Outside click handles closing dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const hasCartItems = getTotalCartAmount ? getTotalCartAmount() > 0 : false

  return (
    <div className='navbar'>
      {/* Logo */}
      <Link to='/' className='navbar-logo-link'>
        <img
          src={assets.logo}
          alt='Zesty Food Logo'
          className='logo'
        />
      </Link>

      {/* Menu Links */}
      <ul className="navbar-menu">
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href='#explore-menu'
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href='#app-download'
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>

        <a
          href='#footer'
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      {/* Right Section */}
      <div className='navbar-right'>
        <button className='icon-btn search-btn' aria-label="Search">
          <FiSearch className="nav-icon" />
        </button>

        {/* Cart */}
        <div className="navbar-search-icon">
          <Link to='/cart' className='icon-btn cart-btn' aria-label="Cart">
            <FiShoppingBag className="nav-icon" />
            {hasCartItems && <div className="dot"></div>}
          </Link>
        </div>

        {/* Auth / Profile Area */}
        {isLoggedIn ? (
          <div className="profile-container" ref={dropdownRef}>
            <div
              className={`profile ${showProfile ? "active-profile" : ""}`}
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="profile-avatar">
                <FiUser />
              </div>
              <span className="profile-name">Account</span>
              <FiChevronDown className={`chevron-icon ${showProfile ? "rotate" : ""}`} />
            </div>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <p className="user-welcome">
                      Hello, {user?.name || "User"}!
                  </p>
                </div>
                <hr className="dropdown-divider" />
                <Link
                  to="/my-orders"
                  className="dropdown-item"
                  onClick={() => setShowProfile(false)}
                >
                  <FiBox className="dropdown-icon" />
                  <span>My Orders</span>
                </Link>
                <div className="dropdown-item logout-item" onClick={handleLogout}>
                  <FiLogOut className="dropdown-icon" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="signin-btn"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar