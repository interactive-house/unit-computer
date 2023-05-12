import { useState, useEffect } from "react";
import "firebase/database";
import firebase from "./firebase";
import soil_wet from "../media/soil_wet.png";
import soil_dry from "../media/soil_dry.png";
import soil_perfect from "../media/soil_perfect.png";

function Soil() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const ref = firebase.database().ref("SmartHomeValueSoil/StatusOfSoil");

    ref.on("value", (snapshot) => {
      setStatus(snapshot.val().toLowerCase());
    });

    return () => {
      ref.off();
    };
  }, []);

  return (
    <div className="center">
      <h2 className="description">Soil</h2>
      <div className={`Status ${status === "perfect" ? "borderOn" : status === "dry" ? "borderDry" : "borderWet"}`}>
        <br />
        {status.toLowerCase() === "wet" && (
          <div>
            <h3 className="statussoil">Wet</h3>
            <img src={soil_wet} alt="soil_wet" width="190" height="190" />
          </div>
        )}
        {status.toLowerCase() === "dry" && (
          <div>
            <h3 className="status" style={{ color: "#b2996e" }}>
              Dry
            </h3>
            <img src={soil_dry} alt="soil_dry" width="190" height="190" />
          </div>
        )}
        {status.toLowerCase() === "perfect" && (
          <div>
            <h3 className="status" style={{ color: "#90ee90" }}>
              Perfect
            </h3>
            <img src={soil_perfect} alt="soil_perfect" width="190" height="190" />
          </div>
        )}
        <br />
      </div>
      <br />
    </div>
  );
}

export default Soil;
