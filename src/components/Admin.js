import React, { useState } from "react";
import "../style/Login.css";
import Navbar from "./NavBar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import firebase from "./firebase";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [password, setPassword] = useState("");
  const [dbValidationCode, setDbValidationCode] = useState("");

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
        alert(errorCode);
      });
    } else {
      alert("Validation code is incorrect");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="loginDescription">Create account</h1>
      <div className="login">
          <label>
            <br></br>
            <br></br>
            <p className="text">Username</p>
            <input
              type="text"
              value={email}
              className="input"
              placeholder="Email"
              onChange={handleUsername}
            />
          </label>
          <label>
            <p className="text">Password</p>
            <input
              type="text"
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
            />
          </label>
          <div>
            {" "}
            <br></br>
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

export default Admin;
