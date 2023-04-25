import { useNavigate } from "react-router";
import React, { useState } from "react";
import "../style/Login.css";
import Navbar from "./NavBar";

function Admin() {
  const [username, setUsername] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleValidationCode = (event) => {
    setValidationCode(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Write code here to add the new user
    alert(
      "Account created successfully" + username + password + validationCode
    );
  };

  return (
    <div>
      <Navbar />
      <h1 className="loginDescription">Create account</h1>
      <div className="login">
        <form onSubmit={handleLogin}>
          <label>
            <br></br>
            <br></br>
            <p className="text">Username</p>
            <input
              type="text"
              value={username}
              className="input"
              placeholder="Username"
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
            <button className="loginButton" type="submit">
              Create Account
            </button>
          </div>
        </form>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Admin;
