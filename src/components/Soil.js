import { useState, useEffect } from "react";
import "firebase/database";
import firebase from "./firebase";
import soil_wet from "../media/soil_wet.png";
import soil_dry from "../media/soil_dry.png";
import soil_perfect from "../media/soil_perfect.png";

function Soil() {
  const [Status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = firebase.database().ref("SmartHomeValueSoil/StatusOfSoil");

    ref.on("value", (snapshot) => {
      setStatus(snapshot.val().toLowerCase());
    });

    return () => {
      ref.off();
    };
  }, []);

  useEffect(() => {
    if (Status !== null) {
      setLoading(false);
    }
  }, [Status]);

  if (loading) {
    return (
      <div className="center">
        <h2 className="description">Soil</h2>
        <div className="loadingBorder">
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <h2 className="description">Soil</h2>
      <div
        className={`Status ${
          Status === "perfect"
            ? "borderOn"
            : Status === "dry"
            ? "borderDry"
            : "borderWet"
        }`}
      >
        <br />
        {Status.toLowerCase() === "wet" && (
          <div>
            <h3 className="statussoil">Wet</h3>
            <img src={soil_wet} alt="soil_wet" width="190" height="190" />
          </div>
        )}
        {Status.toLowerCase() === "dry" && (
          <div>
            <h3 className="status" style={{ color: "#b2996e" }}>
              Dry
            </h3>
            <img src={soil_dry} alt="soil_dry" width="190" height="190" />
          </div>
        )}
        {Status.toLowerCase() === "perfect" && (
          <div>
            <h3 className="status" style={{ color: "#90ee90" }}>
              Perfect
            </h3>
            <img
              src={soil_perfect}
              alt="soil_perfect"
              width="190"
              height="190"
            />
          </div>
        )}
        <br />
      </div>
      <br />
    </div>
  );
}

export default Soil;
