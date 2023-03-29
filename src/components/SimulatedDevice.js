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
  const [actionData, setActionData] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState(null);
  const [songList, setSongList] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    const actionRef = dbRef.child("simulatedDevices/action");
    const deviceStatusRef = dbRef.child("simulatedDevices/deviceStatus");
    const songListRef = dbRef.child("simulatedDevices/songList");
    const statusRef = dbRef.child("simulatedDevices/status");

    actionRef.on("value", (snapshot) => {
      setActionData(snapshot.val());
    });

    deviceStatusRef.on("value", (snapshot) => {
      setDeviceStatus(snapshot.val());
    });

    songListRef.on("value", (snapshot) => {
      const songs = [];
      snapshot.forEach((childSnapshot) => {
        songs.push(childSnapshot.val());
      });
      setSongList(songs);
    });

    statusRef.on("value", (snapshot) => {
      setStatus(snapshot.val());
    });

    return () => {
      actionRef.off();
      deviceStatusRef.off();
      songListRef.off();
      statusRef.off();
    };
  }, []);

  const handlePlay = () => {
    firebase.database().ref("simulatedDevices/action").update({
      type: "play",
      trackId: actionData?.trackId || songList[0]?.trackId
    });
  };
  
  const handlePause = () => {
    firebase.database().ref("simulatedDevices/action").update({
      type: "pause",
      trackId: actionData?.trackId || songList[0]?.trackId
    });
  };
  
  const handleStop = () => {
    firebase.database().ref("simulatedDevices/action").update({
      type: "stop",
      trackId: actionData?.trackId || songList[0]?.trackId
    });
  };
  
  const handlePrev = () => {
    const currentIndex = songList.findIndex((song) => song.trackId === actionData.trackId);
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    const prevTrackId = songList[prevIndex].trackId;
    firebase.database().ref("simulatedDevices/action").update({
      type: "prev",
      trackId: prevTrackId
    });
  };
  
  const handleNext = () => {
    const currentIndex = songList.findIndex((song) => song.trackId === actionData.trackId);
    const nextIndex = (currentIndex + 1) % songList.length;
    const nextTrackId = songList[nextIndex].trackId;
    firebase.database().ref("simulatedDevices/action").update({
      type: "next",
      trackId: nextTrackId
    });
  }
  

  





  return (
    <div className="music-player">
      <h2 className="description">Simulated device</h2>
      <div className="border">
        <div>
          <img src={simudev} alt="simulated_device" width="160" height="180" />
  
          {actionData && (
            <div>
              {songList.length > 0 && (
                <>
                  {songList.map((song, index) => (
                    <div key={index}>
                      {song.trackId === actionData?.trackId && (
                        <div>
                          <h2>Current song:</h2>
                          <p>{song.artist}: {song.song}</p>
                          <p><strong>Status:</strong> {actionData.type}</p>
                          <p id="random-id">-----Random id when press next in action not yet implemented-----</p>

                        </div>
                      )}
                    </div>
                  ))}
                  <hr className={deviceStatus === "online" ? "hr-green" : "hr-red"} />

                  <ul>
                    {songList.map((song, index) => (
                      <li key={index}>
                        <h5>{song.artist}: {song.song}</h5>
                      </li>
                    ))}
                  </ul>
                  
                </>
              )}
            </div>
          )}
  
          {deviceStatus && (
            <>
              <h4>
                Device Status:{" "}
                <span className={`status ${deviceStatus === "online" ? "status-on" : "status-off"}`}>
                  {deviceStatus}
                </span>
              </h4>
            </>
          )}
  
          {status && <p className="status">{status}</p>}
  
          <div className="player-controls">
            <button className="control-button" onClick={handlePrev}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className="control-button" onClick={handleStop}>
              <FontAwesomeIcon icon={faStop} />
            </button>
            <button className="control-button" onClick={handlePlay}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className="control-button" onClick={handleNext}>
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
          }

          export default SimulatedDevice;
