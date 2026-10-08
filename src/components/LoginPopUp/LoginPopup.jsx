import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {
  const { login } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {

      // REGISTER
      if (currState === "Sign Up") {

        const response = await axios.post(
          "http://127.0.0.1:8000/auth/register",
          {
            name: name,
            email: email,
            password: password
          }
        )

        console.log("REGISTER RESPONSE:", response.data)

        alert("Account created successfully!")

        // Switch to login
        setCurrState("Login")
        setName("")
        setEmail("")
        setPassword("")
      }

      // LOGIN
      else {

        const response = await axios.post(
          "http://127.0.0.1:8000/auth/login",
          {
            email: email,
            password: password
          }
        )

        console.log("LOGIN RESPONSE:", response.data)

        // Save JWT token
        login(response.data.access_token)

        alert("Login successful!")

        setShowLogin(false)
      }

    } catch (error) {

      console.error("AUTH ERROR:", error)

      if (error.response) {
        setError(error.response.data.detail)
      } else {
        setError("Something went wrong. Please try again.")
      }

    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='login-popup'>

      <form
        onSubmit={handleSubmit}
        className="login-popup-container"
      >

        <div className="login-popup-title">

          <h2>{currState}</h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />

        </div>


        <div className="login-popup-inputs">

          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>


        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}


        <button type="submit" disabled={loading}>

          {loading
            ? "Please wait..."
            : currState === "Sign Up"
              ? "Create account"
              : "Login"
          }

        </button>


        <div className="login-popup-condition">

          <input type="checkbox" required />

          <p>
            By continuing, I agree to the terms of use
            and privacy policy.
          </p>

        </div>


        {currState === "Login" ? (

          <p>
            Create a new account?

            <span onClick={() => {
              setCurrState("Sign Up")
              setError("")
            }}>
              Click here
            </span>

          </p>

        ) : (

          <p>
            Already have an account?

            <span onClick={() => {
              setCurrState("Login")
              setError("")
            }}>
              Login here
            </span>

          </p>

        )}

      </form>

    </div>
  )
}

export default LoginPopup