import { useState, useEffect } from "react";
import "../style/Style.css";
import Light from "./Light";
import Door from "./Door";
import Window from "./Window";
import Soil from "./Soil";
import SimulatedDevice from "./SimulatedDevice";
import Navbar from "./NavBar";
import ReactLoading from "react-loading";

function Home() {
  const [showBuffer, setShowBuffer] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBuffer(false);
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);





  return (
    <div>
      {showBuffer && (
        <div className="buffer-container">
        <ReactLoading
        type="spin"
        color="rgb(0, 255, 89)"
        height={100}
        width={100}
        
      />

        </div>
      )}
      <div className={`content-container${showContent ? " show" : ""}`}>
        <Navbar />
        <Light />
        <Door />
        <Window />
        <SimulatedDevice />
        <Soil />
        <br />
      </div>
    </div>
  );
}

export default Home;
