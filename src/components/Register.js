import React, { useState } from "react";
import "../style/Login.css";
import Navbar from "./NavBar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "./firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [password, setPassword] = useState("");
  const [dbValidationCode, setDbValidationCode] = useState("");
  const [createAccountError, setAccountError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/home");
    } 
  });
}, []);

  useEffect(() => {
    const Ref = firebase.database().ref("ValidationCode");
    Ref.on("value", (snapshot) => {
      const data = snapshot.val();
      setDbValidationCode(data);
    });
  }, []);

  const handleUsername = (event) => {
    setEmail(event.target.value);
  };

  const handleValidationCode = (event) => {
    setValidationCode(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleNewAccount = async () => {
    const auth = getAuth();
    if (validationCode === dbValidationCode) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          setAccountError(errorCode);
        });
    } else {
      setAccountError("Validation code is incorrect");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="loginDescription">Create account</h1>
      <div className="login">
        <form onSubmit={handleNewAccount}>
        <label>
          <br></br>
          <br></br>
          <p className="text">Username</p>
          <input
            type="email"
            value={email}
            className="input"
            placeholder="Email"
            onChange={handleUsername}
          />
        </label>
        <label>
          <p className="text">Password</p>
          <input
            type="password"
            value={password}
            className="input"
            placeholder="Password"
            onChange={handlePassword}
          />
        </label>
        <label>
          <p className="text">Validation code</p>
          <input
            type="password"
            value={validationCode}
            className="input"
            placeholder="Validation code"
            onChange={handleValidationCode}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleNewAccount();
              }
            }}
          />
        </label>
        </form>
        <p className="error">{createAccountError}</p>
        <div>
          {" "}
          <button className="loginButton" onClick={handleNewAccount}>
            Create Account
          </button>
          <br></br>
          <br></br>
          <a href="/">
            Already have an account?
            <br />
            Sign in here!
          </a>
        </div>

        <br></br>
      </div>
    </div>
  );
}

export default Register;
