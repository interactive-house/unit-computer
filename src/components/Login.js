import { useNavigate } from "react-router";
import React, { useState } from "react";
import "../style/Login.css";
import Navbar from "./NavBar";

function Login() {
  const usernameDb = "admin";
  const passwordDb = "admin";

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (username === usernameDb && password === passwordDb) {
      navigate("/home");
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div>
    <Navbar />
    <h1 className="description">Sign In</h1>
    <div className="login">
      
      

      <form onSubmit={handleLogin}>
        <label>
          <br></br>
          <br></br>
          <p className="text">Username</p>
          <input type="text" value={username} className="input" placeholder="Username" onChange={handleUsername} />
        </label>
        <label>
          <p className="text">Password</p>
          <input type="password" value={password} className="input" placeholder="Password" onChange={handlePassword} />
        </label>
        <div>
          {" "}
          <br></br>
          <button className="loginButton" type="submit">Login</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <br></br>
    </div>
    </div>
  );
}

export default Login;
