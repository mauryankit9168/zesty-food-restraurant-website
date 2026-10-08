import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram, 
  FiPhone, 
  FiMail, 
  FiMapPin 
} from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className="footer-content">
        
        {/* Left Section: Brand & Bio */}
        <div className="footer-section footer-brand">
          <a href="#"><img src={assets.logo} alt="Zesty Food Logo" className='footer-logo'/></a>
          <p className="footer-desc">
            Satisfy your cravings with fresh, delicious meals delivered fast to your doorstep. Quality ingredients and unbeatable flavor in every bite!
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
        </div>

        {/* Center Section: Company Navigation Links */}
        <div className="footer-section footer-links">
          <h2>COMPANY</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#explore-menu">About us</a></li>
            <li><a href="#app-download">Delivery</a></li>
            <li><a href="#privacy">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right Section: Contact Information */}
        <div className="footer-section footer-contact">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <FiPhone className="contact-icon" />
              <span>+91 9625600669</span>
            </li>
            <li>
              <FiMail className="contact-icon" />
              <span>zestyfood@gmail.com</span>
            </li>
            <li>
              <FiMapPin className="contact-icon" />
              <span>New Delhi, India</span>
            </li>
          </ul>
        </div>

      </div>

      <hr className="footer-divider" />
      
      <p className="footer-copyright">
        Copyright {new Date().getFullYear()} © zesty-food.com - All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer