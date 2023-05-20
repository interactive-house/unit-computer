import "../style/Style.css";
import Light from "./Light";
import Door from "./Door";
import Window from "./Window";
import Soil from "./Soil";
import SimulatedDevice from "./SimulatedDevice";
import Navbar from "./NavBar";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } 
    });
  }, []);

  return (
    <div className="center">
      <Navbar />

      <div className="flex">
        <Light />
        <Door />
        <Window />
        <SimulatedDevice />
        <Soil />
      </div>

      <br />
    </div>
  );
}

export default Home;
