import Home from "./Home";

import { useNavigate } from "react-router";

function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };



    return (
      <div className="center">
        <h1>Sign In</h1>
        <button onClick={handleLogin}>Sign in</button>

    </div>


        
    );
};
  
export default Login;