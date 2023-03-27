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
  const [SimDevValue, setSimDevValue] = useState([]);

  useEffect(() => {
    const Ref = firebase.database().ref("simulatedDevices");

    Ref.on("value", (snapshot) => {
      const value = snapshot.val();
      setSimDevValue(value);
    });

    return () => {
      Ref.off();
    };
  }, []);

  const handlePlayPauseToggle = () => {
    const newStatus = status === "play" ? "pause" : "play";
    firebase.database().ref("/simulatedDevices/status").set(newStatus);
  };

  const handleStopToggle = () => {
    const newStatus = "stop";
    firebase.database().ref("/simulatedDevices/status").set(newStatus);
  };

  const handleNextToggle = () => {
    const currentIndex = songList.indexOf(currentTrack);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= songList.length) {
      nextIndex = 1;
    }
    const newTrack = songList[nextIndex];
    firebase.database().ref("/simulatedDevices/currentTrack").set(newTrack);
  };

  const handlePreviousToggle = () => {
    const currentIndex = songList.indexOf(currentTrack);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 1) {
      prevIndex = songList.length - 1;
    }
    const newTrack = songList[prevIndex];
    firebase.database().ref("/simulatedDevices/currentTrack").set(newTrack);
  };

  const { currentTrack, deviceStatus, songList, status } = SimDevValue;

  return (
    <div>
      <h2 className="description"> Simulated device</h2>
      <div className="border">
        <div>
          <img src={simudev} alt="simulated_device" width="160" height="180" />

          <h2>Current track: {currentTrack}</h2>

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

          <button
            className="control-button previous"
            onClick={handlePreviousToggle}
          >
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button
            className="control-button play"
            onClick={handlePlayPauseToggle}
          >
            <FontAwesomeIcon icon={status === "play" ? faPause : faPlay} />
          </button>
          <button className="control-button stop" onClick={handleStopToggle}>
            <FontAwesomeIcon icon={faStop} />
          </button>
          <button className="control-button next" onClick={handleNextToggle}>
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
