import light_on from "../media/light_on.png";
import light_off from "../media/light_off.png";
import door_open from "../media/door_open.png";
import door_closed from "../media/door_closed.png";
import window_open from "../media/window_open.png";
import window_closed from "../media/window_closed.png";
import soil_wet from "../media/soil_wet.png";
import soil_dry from "../media/soil_dry.png";
import simudev from "../media/simudevice.png"



import React, { useState, useEffect } from "react";
import ReactSwitch from 'react-switch';
import "firebase/database";
import firebase from "./firebase";
import "../style/Home.css";
//import { serverTimestamp } from "firebase/database";

function Home() {
  const [lightStatus, setLightStatus] = useState(false);
  const [doorStatus, setDoorStatus] = useState(false);
  const [windowStatus, setWindowStatus] = useState(false);
  const [SoilStatus, setSoilStatus] = useState(false);
  const [SimuDevStatus, setSimuDevStatus] = useState(false);



  const [doorValue, setDoorValue] = useState("");
  const [lampValue, setLampValue] = useState("");
  const [windowValue, setWindowValue] = useState("");
  const [SoilValue, setSoilValue] = useState("");

  //music
  const [SimuDevValue, setSimuDevValue] = useState([]);
  

  useEffect(() => {
    const doorRef = firebase.database().ref("SmartHomeValueDoor/StatusOfDoor");
    const lampRef = firebase.database().ref("SmartHomeValueLight/StatusOflight");
    const windowRef = firebase.database().ref("SmartHomeValueWindow/StatusOfWindow");
    const soilRef = firebase.database().ref("SmartHomeValueSoil/StatusOfSoil");
    const SimuDevRef = firebase.database().ref('simulatedDevices');


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

 
    SimuDevRef.on('value', (snapshot) => {
      const value = snapshot.val();
      console.log(value);
      setSimuDevValue(value);
    });
  
    

    
   

    return () => {
      doorRef.off();
      lampRef.off();
      windowRef.off();
      soilRef.off();
      SimuDevRef.off();
    };
  }, []);

  const { currentTrack, deviceStatus, songList, status } = SimuDevValue;



  const handleLampToggle = (checked) => {
    firebase.database().ref("SmartHomeValueLight/StatusOflight").set(checked ? "on" : "off");
  };

  const handleDoorToggle = (checked) => {
    firebase.database().ref("SmartHomeValueDoor/StatusOfDoor").set(checked ? "open" : "closed");
  };

  const handleWindowToggle = (checked) => {
    firebase.database().ref("/SmartHomeValueWindow/StatusOfWindow").set(checked ? "open" : "closed");
  };

  const handlsimudevstatToggle = () => {
    const newStatus = status === 'play' ? 'pause' : 'play';
    firebase.database().ref('/simulatedDevices/status').set(newStatus);
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
                <img src={window_open} alt="window_open" width="160" height="130" />
              </div>
            }
            {!windowStatus &&
              <div>
                <h3 className="status" style={{ color: "red" }}> Closed </h3>
                <img src={window_closed} alt="window_closed" width="160" height="130" />
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
        <h2 className="description"> Simulated de </h2>
        </div>
        <div className="border">
            <br/>

            <div>
            <img src={simudev} alt="simulated_device" width="160" height="180" />

            <h2>Current track: {currentTrack}</h2>
            <h4>Song List:</h4>
            {songList && songList.map((song, index) => (
              <h4 key={index}>{song}</h4>
              ))}

            <h3 className="simudev-info">Device status:&nbsp;
            <span className={`simudev-status 
            ${deviceStatus === 'on' ? 'status-on' : 'status-off'}`}>
               {deviceStatus}
              </span>
              </h3>


            <h3>Status: {status}</h3>
                <button
                  className={`simudev-player-button ${status === 'play' ? 'play' : 'pause'}`}
                  onClick={handlsimudevstatToggle}
                >
                  {status === 'play' ? 'Pause' : 'Play'}
                </button>


    </div>

                  



            
            








            <br />
          </div>
      
          <br />




        <div className="center">
        <h2 className="description"> Units </h2>
        </div>
        <div className="border">
        <br/>
        
        <b>Lamp value: {lampValue}</b>
        <br/>
        <b>Door value: {doorValue}</b>
        <br/>
        <b>Window value: {windowValue}</b>
        <br/>
        <b>Soil value: {SoilValue}</b>
        <br/>
        <b>Simulated device value: {status}</b>
        <br/>
        <br/>
        </div>
        <br/>
        </div>
        
    );
};
  
export default Home;