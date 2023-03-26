import "../style/Home.css";
import Light from "./Light";
import Door from "./Door";
import Window from "./Window";
import Soil from "./Soil";
import SimulatedDevice from "./SimulatedDevice";
import Navbar from "./NavBar";

function Home() {
  return (
    <div>
      <Navbar />
      <Light />
      <Door />
      <Window />
      <Soil />
      <SimulatedDevice />
      <br />
    </div>
  );
}

export default Home;