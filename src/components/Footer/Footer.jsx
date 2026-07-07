import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-left-content">
                <img src={assets.logo} alt="" className='imglogo'/>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos aliquam voluptatum laborum dolorum sint, illum minima praesentium at magnam molestias veniam delectus sapiente, asperiores aperiam, in dolorem ea earum. Doloribus?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-right-content">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>9625600669</li>
                    <li>zestyfood@gmail.com</li>
                    
                </ul>
            </div>
            <div className="footer-center-content">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>

                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 © zesty-food.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
