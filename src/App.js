import './App.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"




import Home from "./components/Home"
import Login from "./components/Login"



function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />


        
          {/*If path is not found, redirect to Home*/}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  </>
  );
}

export default App;
