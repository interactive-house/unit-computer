import "../style/Style.css";
import Light from "./Light";
import Door from "./Door";
import Window from "./Window";
import Soil from "./Soil";
import SimulatedDevice from "./SimulatedDevice";
import Navbar from "./NavBar";

function Home() {
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
