import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./NavBar";

function Login() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false); 

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      // If login is successful, navigate to "/home"
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      setWrongPassword(true); // Set wrongPassword state to true on login error
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="loginDescription">Sign In</h1>
      <div className="login">
        <label>
          <br />
          <br />
          <p className="text">Email</p>
          <input 
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
            style={{ width: "220px", height: "25px" }}
          />
        </label>
        <label>
          <p className="text">Password</p>
          <input 
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(event) => {
              setLoginPassword(event.target.value);
              setWrongPassword(false);
            }}
            style={{ width: "220px", height: "25px" }}
            
          />
        </label>
        {wrongPassword && (
          <p style={{ color: "red" }}>Incorrect password or ivalid email</p>
        )}
        <div>
          <br />
          <button className="loginButton" type="button" onClick={login}>
            Login
          </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Login;
