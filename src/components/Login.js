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
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      setWrongPassword(true);
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
            className="input" 
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
            className="input" 
          />
        </label>
        {wrongPassword && (
          <p style={{ color: "red" }}>Incorrect password or invalid email</p>
        )}
        <div>
          <br />
          <button className="loginButton" type="button" onClick={login}>
            Login
          </button>
          <br />
          <br />
          <a href="/register">No account?<br />
          Register here!</a>
        </div>
        <br />

      </div>
    </div>
  );
}

export default Login;
