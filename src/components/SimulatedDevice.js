import { useState, useEffect } from "react";
import "firebase/database";
import firebase from "./firebase";
import simudev from "../media/simudevice.png";
import "../style/SimulatedDevice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

function SimulatedDevice() {
  const [SimuDevValue, setSimuDevValue] = useState([]);

  useEffect(() => {
    const Ref = firebase.database().ref("simulatedDevices");

    Ref.on("value", (snapshot) => {
      const value = snapshot.val();
      setSimuDevValue(value);
    });

    return () => {
      Ref.off();
    };
  }, []);
  
  const handlePlayPauseToggle = () => {
    const newStatus = status === "play" ? "pause" : "play";
    firebase.database().ref("/simulatedDevices/status").set(newStatus);
  };

  const { currentTrack, deviceStatus, songList, status } = SimuDevValue;

  return (
    <div>
      <h2 className="description"> Simulated device</h2>
      <div className="border">
        <br />
        <div>
          <img src={simudev} alt="simulated_device" width="160" height="180" />

          <h2>Current track: {currentTrack}</h2>
          <h4>Song List:</h4>
          {songList &&
            songList.map((song, index) => <h4 key={index}>{song}</h4>)}

          <h3 className="simudev-info">
            Device status:&nbsp;
            <span
              className={`simudev-status 
            ${deviceStatus === "on" ? "status-on" : "status-off"}`}
            >
              {deviceStatus}
            </span>
          </h3>

          <h3>Status: {status}</h3>
          
          <button className="control-button previous">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button className="control-button play" onClick={handlePlayPauseToggle}>
          <FontAwesomeIcon icon={status === "play" ? faPause : faPlay} />
          </button>
          <button className="control-button stop">
            <FontAwesomeIcon icon={faStop} />
          </button>
          <button className="control-button next">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
        <br />
      </div>
      <br />
    </div>
  );
}

export default SimulatedDevice;
