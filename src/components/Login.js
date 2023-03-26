import { useNavigate } from "react-router";
import React, { useState } from "react";
import "../style/Login.css";

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
    }
    else {
      alert("Wrong username or password");
    }
  };


    return (
      <div className="login">
        <h1>Sign In</h1>

        <form onSubmit={handleLogin}>
          <label>
            <p>Username</p>
            <input type="text" value={username} onChange={handleUsername} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" value={password} onChange={handlePassword} />
          </label>
        <div> <br></br>
          <button type="submit">Login</button>
        </div>
        </form>
      </div>


        
    );
};

  
export default Login;