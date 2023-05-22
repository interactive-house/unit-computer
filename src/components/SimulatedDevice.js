import { useState, useEffect } from "react";
import "firebase/database";
import firebase from "./firebase";
import simudev from "../media/simudevice.png";
import songnotes from "../media/songnotes.png";
import "../style/SimulatedDevice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import offline from "../media/offline.png";
import equalizer from "../media/equalizer.gif";


import { v4 as uuidv4 } from "uuid"; //npm install uuid

import {
  faPlay,
  faPause,
  faStop,
  faBackward,
  faForward,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";
import { set } from "firebase/database";

function SimulatedDevice() {
  const [actionData, setActionData] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState(null);
  const [songList, setSongList] = useState([]);
  const [status, setStatus] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setstate] = useState(null);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    const actionRef = dbRef.child("/simulatedDevices/playerState/currentTrack");
    const deviceStatusRef = dbRef.child("simulatedDevices/deviceStatus");
    const songListRef = dbRef.child("simulatedDevices/songList");
    const statusRef = dbRef.child("/simulatedDevices/action/type");
    const playerstateref = dbRef.child("/simulatedDevices/playerState/state");
 

    actionRef.on("value", (snapshot) => {
      const actionData = snapshot.val();
      setActionData(actionData);
      
    });

    deviceStatusRef.on("value", (snapshot) => {
      setDeviceStatus(snapshot.val().toLowerCase());
    });

    playerstateref.on("value", (snapshot) => {
      setstate(snapshot.val().toLowerCase());

      const state = snapshot.val().toLowerCase();

      if (state === "playing") {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    });

    songListRef.on("value", (snapshot) => {
      const songs = [];
      snapshot.forEach((childSnapshot) => {
        const song = {
          id: childSnapshot.key,
          artist: childSnapshot.child("artist").val(),
          track: childSnapshot.child("song").val(),
          trackId: childSnapshot.child("trackId").val(),
        };
        songs.push(song);
      });
      setSongList(songs);
    });

statusRef.on("value", (snapshot) => {
  const status = snapshot.val().toLowerCase();
  setStatus(status);
});


    return () => {
      actionRef.off();
      deviceStatusRef.off();
      songListRef.off();
      statusRef.off();
      playerstateref.off();
    };
  }, []);

  const handleStop = () => {
    const newUUID = uuidv4();
    firebase.database().ref("/simulatedDevices/action").set({
      id: newUUID,
      type: "stop",
    });

  };

  const handlePlayPauseToggle = () => {
    const newUUID = uuidv4();

    if (state === "playing") {
      firebase.database().ref("/simulatedDevices/action").set({
        id: newUUID,
        type: "pause",
      });
    } else {
      firebase.database().ref("/simulatedDevices/action").set({
        id: newUUID,
        type: "play",
      });
    
  }
  };

  const handlePrev = () => {
    const newUUID = uuidv4();

    firebase.database().ref("simulatedDevices/action").set({
      id: newUUID,
      type: "prev",
    });
  

  };

  const handleNext = () => {
    const newUUID = uuidv4();

    firebase.database().ref("simulatedDevices/action").set({
      id: newUUID,
      type: "next",
    });
  

  };
  
  

  return (
    <div className="music-player">
      <h2 className="description">Simulated device</h2>
      <div
        className={`Status ${
          deviceStatus === "offline" ? "border" : "borderOn"
        }`}
      >
        {deviceStatus === "offline" ? (
          <div className="offline-status">
            <img
              src={offline}
              alt="simulated_device"
              width="190"
              height="200"
              className="sleeping-image"
            />
            <h4>
              Device Status:{" "}
              <span className="status status-off">{deviceStatus}</span>
            </h4>
            <hr className="hr-red" />
          </div>
        ) : (
          <div>
            <img
              src={simudev}
              alt="simulated_device"
              width="190"
              height="200"
            />

            {isPlaying && (
              <img
                src={songnotes}
                alt="simulated_device"
                width="160"
                height="180"
                className="flying-notes"
              />
            )}

            {actionData && (
              <div>
                {songList.length > 0 && (
                  <>
                    {songList.map((song, index) => (
                      <div key={index}>
                        {song.trackId === actionData?.trackId && (
                          <div>
                            <h2>Current song:</h2>
                            <p>
                              {song.artist}: {actionData.track}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}

                  
       
                          <hr className={deviceStatus === "online" ? "hr-green" : "hr-red"} />
            






                    <ul>
                      {songList.map((song, index) => (
                        <li key={index}>
                          <h5
                            onClick={() => {
                              const newUUID = uuidv4();
                              firebase
                                .database()
                                .ref("simulatedDevices/action")
                                .set({
                                  id: newUUID,
                                  type: "play",
                                  trackId: song.trackId,
                                });

                             
                              
                            }}
                          >
                            {song.artist}: {song.track}
                          </h5>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {deviceStatus && deviceStatus !== "offline" && (
              <>
                <h4>
                  Device Status:{" "}
                  <span
                    className={`status ${
                      deviceStatus === "online" ? "status-on" : "status-off"
                    }`}
                  >
                    {deviceStatus}
                  </span>
                </h4>
              </>
            )}

            <div className="player-controls">
              <button className="control-button" onClick={handlePrev}>
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button
                className="control-button" onClick={handlePlayPauseToggle}>
                <FontAwesomeIcon  icon={state === "playing" ? faPause : faPlay} />
              </button>
              <button className="control-button" onClick={handleStop}>
                <FontAwesomeIcon icon={faStop} />
              </button>

              <button className="control-button" onClick={handleNext}>
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
          </div>
        )}
        <br />
      </div>
      <br />
    </div>
  );
}

export default SimulatedDevice;
