import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./NavBar";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const login = async () => {
    const auth = getAuth();
    try {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/home");
        }
      ).catch((error) => {
        console.log(error.message);
        setWrongPassword(true);
    } );
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
        <form onSubmit={login}>
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
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  login();
                }
              }}
              className="input"
            />
          </label>
        </form>
        {wrongPassword && (
          <p className="error">Incorrect password or invalid email</p>
        )}
        <div>
          <button className="loginButton" type="submit" onClick={login}>
            Login
          </button>
          <br />
          <br />
          <a href="/register">
            No account?
            <br />
            Register here!
          </a>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Login;
