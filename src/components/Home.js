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

      <table className="table">
        <tr>
          <td>
            <div class="centered-container">
              <div class="centered-component">
                <Light />
              </div>
              <div class="centered-component">
                <Door />
              </div>
              <div class="centered-component">
                <Window />
              </div>
              <div class="centered-component">
                <SimulatedDevice />
              </div>
              <div class="centered-component">
                <Soil />
              </div>
            </div>
          </td>
        </tr>
      </table>

      <br />
    </div>
  );
}

export default Home;
