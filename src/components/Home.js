import light_on from "../media/light_on.png";
import light_off from "../media/light_off.png";
import door_open from "../media/door_open.png";
import door_closed from "../media/door_closed.png";
import window_open from "../media/window_open.png";
import window_closed from "../media/window_closed.png";
import soil_wet from "../media/soil_wet.png";
import soil_dry from "../media/soil_dry.png";


import React, { useState, useEffect } from "react";
import ReactSwitch from 'react-switch';
import "firebase/database";
import firebase from "./firebase";
import "../style/Home.css";

function Home() {
  const [lightStatus, setLightStatus] = useState(false);
  const [doorStatus, setDoorStatus] = useState(false);
  const [windowStatus, setWindowStatus] = useState(false);
  const [SoilStatus, setSoilStatus] = useState(false);

  const [doorValue, setDoorValue] = useState("");
  const [lampValue, setLampValue] = useState("");
  const [windowValue, setWindowValue] = useState("");
  const [SoilValue, setSoilValue] = useState("");

  useEffect(() => {
    const doorRef = firebase.database().ref("SmartHomeValueDoor/StatusOfDoor");
    const lampRef = firebase.database().ref("SmartHomeValueLight/StatusOflight");
    const windowRef = firebase.database().ref("SmartHomeValueWindow/StatusOfWindow");
    const soilRef = firebase.database().ref("SmartHomeValueSoil/StatusOfSoil");

    doorRef.on("value", (snapshot) => {
      setDoorValue(snapshot.val());
      setDoorStatus(snapshot.val() === "open");
    });

    lampRef.on("value", (snapshot) => {
      setLampValue(snapshot.val());
      setLightStatus(snapshot.val() === "on");
    });

    windowRef.on("value", (snapshot) => {
      setWindowValue(snapshot.val());
      setWindowStatus(snapshot.val() === "open");
    });

    soilRef.on("value", (snapshot) => {
      setSoilValue(snapshot.val());
      setSoilStatus(snapshot.val() === "wet");
    });

    return () => {
      doorRef.off();
      lampRef.off();
      windowRef.off();
      soilRef.off();
    };
  }, []);

  const handleLampToggle = (checked) => {
    firebase.database().ref("SmartHomeValueLight/StatusOflight").set(checked ? "on" : "off");
  };

  const handleDoorToggle = (checked) => {
    firebase.database().ref("SmartHomeValueDoor/StatusOfDoor").set(checked ? "open" : "closed");
  };

  const handleWindowToggle = (checked) => {
    firebase.database().ref("/SmartHomeValueWindow/StatusOfWindow").set(checked ? "open" : "closed");
  };

  const handleSoilToggle = (checked) => {
    firebase.database().ref("SmartHomeValueSoil/StatusOfSoil").set(checked ? "wet" : "dry");
  };


    return (
      <div>
    <div className="center">
      <br />
      <h1 className="shadow"> Unit-Computer </h1>

      <h2 className="description">Light</h2>
    </div>
    <div className="border">
      <br />
      <ReactSwitch
        checked={lightStatus}
        onChange={handleLampToggle}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        width={48}
        height={20}
        id="material-switch"
      />
     {lightStatus &&
        <div>
          <h3 className="status"> On </h3>
          <img src={light_on} alt="light_on" width="80" height="100" />
        </div>
      }
      {!lightStatus &&
        <div>
          <h3 className="status" style={{ color: "red" }}> Off </h3>
          <img src={light_off} alt="light_off" width="80" height="100" />
        </div>
      }
        <br />
        </div>
        <br />




        <div className="center">
        <h2 className="description"> Door </h2>
        </div>
        <div className="border">
            <br/>
            <ReactSwitch
              checked={doorStatus}
              onChange={handleDoorToggle}     
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              width={48}
              height={20}
              id="material-switch"
            />
             {doorStatus &&
              <div>
                <h3 className="status"> Open </h3>
                <img src={door_open} alt="door_open" width="80" height="150" />
              </div>
            }
            {!doorStatus &&
              <div>
                <h3 className="status" style={{ color: "red" }}> Closed </h3>
                <img src={door_closed} alt="door_closed" width="80" height="150" />
              </div>
            }
            <br />
          </div>
      
          <br />



          <div className="center">
        <h2 className="description"> Window </h2>
        </div>
        <div className="border">
            <br/>
            <ReactSwitch
              checked={windowStatus}
              onChange={handleWindowToggle}     
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              width={48}
              height={20}
              id="material-switch"
              
            />
             {windowStatus &&
              <div>
                <h3 className="status"> Open </h3>
                <img src={window_open} alt="window_open" width="200" height="150" />
              </div>
            }
            {!windowStatus &&
              <div>
                <h3 className="status" style={{ color: "red" }}> Closed </h3>
                <img src={window_closed} alt="window_closed" width="150" height="150" />
              </div>
            }
            <br />
          </div>
      
          <br />


        <div className="center">
        <h2 className="description"> Soil </h2>
        </div>
        <div className="border">
            <br/>
             {SoilStatus &&
              <div>
                <h3 className="statussoil"> Wet </h3>
                <img src={soil_wet} alt="soil_wet" width="130" height="130" />
              </div>
            }
            {!SoilStatus &&
              <div>
                <h3 className="status" style={{ color: "#b2996e" }}> Dry </h3>
                <img src={soil_dry} alt="soil_dry" width="130" height="130" />
              </div>
            }
            <br />
          </div>
      
          <br />


        <div className="center">
        <h2 className="description"> Music Player </h2>
        </div>
        <div className="border">
            <br/>
            <div className="music-player">
          <audio controls> <source src="workfromhome.mp3" type="audio/mpeg"/> Your browser does not support the audio element.</audio>
          <div className="song-details">
            <h4 className="song-name">Song Name</h4>
            <div className="player-controls">
              <button className="play-pause-btn">Play</button>
              <p className="device-status">Device Status: On</p>
            </div>
          </div>
        </div>
            <br />
          </div>
      
          <br />




        <div className="center">
        <h2 className="description"> Units </h2>
        </div>
        <div className="border">
        
        <b>Lamp value: {lampValue}</b>
        <br/>
        <b>Door value: {doorValue}</b>
        <br/>
        <b>Window value: {windowValue}</b>
        <br/>
        <b>Soil value: {SoilValue}</b>
        <br/>
        </div>
        <br />
        </div>
        
    );
};
  
export default Home;