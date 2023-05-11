import { useState, useEffect } from "react";
import "firebase/database";
import firebase from "./firebase";
import simudev from "../media/simudevice.png";
import songnotes from "../media/songnotes.png";
import "../style/SimulatedDevice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { v4 as uuidv4 } from "uuid"; //npm install uuid

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
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    const actionRef = dbRef.child("/simulatedDevices/playerState/currentTrack");
    const deviceStatusRef = dbRef.child("simulatedDevices/deviceStatus");
    const songListRef = dbRef.child("simulatedDevices/songList");
    const statusRef = dbRef.child("/simulatedDevices/playerState/state/state");
  
    actionRef.on("value", (snapshot) => {
      const actionData = snapshot.val();
      setActionData(actionData);
      if (actionData.type === "next" || actionData.type === "prev") {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    });
  
    deviceStatusRef.on("value", (snapshot) => {
      setDeviceStatus(snapshot.val());
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
      setStatus(snapshot.val());
    });
  
    return () => {
      actionRef.off();
      deviceStatusRef.off();
      songListRef.off();
      statusRef.off();
    };
  }, []);
  

  const handleStop = () => {
    const newUUID = uuidv4();
    firebase
      .database()
      .ref("/simulatedDevices/playerState/state")
      .update({
        state: "stopped",
      });
    setIsPlaying(false);
  
    firebase.database().ref("/simulatedDevices/playerState/currentTrack").update({
      artist: "test",
      track: "test",
      trackId: "78c5d099-f70b-462e-85a4-c33fb4960675",
    });
  };
  

  const handlePlayPauseToggle = () => {
    const { state } = actionData || {};
    const newStatus = state === "playing" ? "paused" : "playing";
    firebase.database().ref("/simulatedDevices/playerState/state/state").set(newStatus);
    setIsPlaying(newStatus === "playing");
  };

  const handlePrev = () => {
    const currentIndex = songList.findIndex(
      (song) => song.trackId === actionData.trackId
    );
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    const prevSong = songList[prevIndex];
    const prevTrackId = prevSong.trackId;
    const newUUID = uuidv4();
    const prevname = `${prevSong.artist}`;
    const prevtrack = `${prevSong.track}`;
  
    firebase.database().ref("simulatedDevices/action").set({
      id: newUUID,
      type: "prev",
    });
  
    firebase.database().ref("/simulatedDevices/playerState/currentTrack").update({
      artist: prevname,
      track: prevtrack,
      trackId: prevTrackId,
    });
  };
  
  

  const handleNext = () => {
    const currentIndex = songList.findIndex((song) => song.trackId === actionData.trackId);
    const nextIndex = (currentIndex + 1) % songList.length;
    const nextTrackId = songList[nextIndex].trackId;
    const nextTrack = songList[nextIndex];
    const newUUID = uuidv4();
    const nexart = `${nextTrack.artist}`;
    const nextra = `${nextTrack.track}`;

  
    console.log("Next song:", nextTrack);
  
    firebase.database().ref("simulatedDevices/action").set({
      id: newUUID,
      type: "next",
    });
  
    firebase.database().ref("/simulatedDevices/playerState/currentTrack").update({
      artist: nexart,
      track: nextra,
      trackId: nextTrackId,
    });
  };
  


  
  
  

  return (
    <div className="music-player">
      <h2 className="description">Simulated device</h2>
      <div className={`Status ${status === false ? "border" : "borderOn"}`}>
        {deviceStatus === "offline" ? (
          <div className="offline-status">
            <img src={simudev} alt="simulated_device" width="190" height="200" />
            <h4>
              Device Status:{" "}
              <span className="status status-off">
                {deviceStatus}
              </span>
            </h4>
            <hr className="hr-red" />
          </div>
        ) : (
          <div>
            <img src={simudev} alt="simulated_device" width="190" height="200" />
  
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
                              {song.artist}: {song.track}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    <p>
                      <strong>Status:</strong> {status}
                    </p>
                    <hr
                      className={
                        deviceStatus === "online" ? "hr-green" : "hr-red"
                      }
                    />
  
                    <ul>
                      {songList.map((song, index) => (
                        <li key={index}>
                          <h5
                            onClick={() => {
                              const newUUID = uuidv4();
                              firebase
                                .database()
                                .ref("simulatedDevices/action")
                                .update({
                                  id: newUUID,
                                  type: "next"
                      
                                });
  
                                firebase
                                .database()
                                .ref("/simulatedDevices/playerState/currentTrack")
                                .update({
                                  artist: song.artist,
                                  track: song.track,
                                  trackId: song.trackId,
                                });
                              setIsPlaying(true);
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
              <button className="control-button" onClick={handlePlayPauseToggle}>
                <FontAwesomeIcon
                  icon={isPlaying ? faPause : faPlay}
                />
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
    </div>
  );
                  }
  

export default SimulatedDevice;