import { useState, useEffect } from "react";
import "firebase/database";
import firebase from "./firebase";
import soil_wet from "../media/soil_wet.png";
import soil_dry from "../media/soil_dry.png";

function Soil() {
  const [Status, setStatus] = useState(false);

  useEffect(() => {
    const Ref = firebase.database().ref("SmartHomeValueSoil/StatusOfSoil");

    Ref.on("value", (snapshot) => {
      setStatus(snapshot.val() === "wet");
    });

    return () => {
      Ref.off();
    };
  }, []);

  return (
    <div className="center">
      <h2 className="description"> Soil </h2>
      <div className="border">
        <br />
        {Status && (
          <div>
            <h3 className="statussoil"> Wet </h3>
            <img src={soil_wet} alt="soil_wet" width="130" height="130" />
          </div>
        )}
        {!Status && (
          <div>
            <h3 className="status" style={{ color: "#b2996e" }}>
              {" "}
              Dry{" "}
            </h3>
            <img src={soil_dry} alt="soil_dry" width="130" height="130" />
          </div>
        )}
        <br />
      </div>

      <br />
    </div>
  );
}

export default Soil;
