import light_on from "../media/light_on.png"
import light_off from "../media/light_off.png"
import door_open from "../media/door_open.png"
import door_closed from "../media/door_closed.png"
import "../style/Home.css"
import firebase from './firebase';

import React, { 
    useState, 
    useEffect 
} from 'react';

import ReactSwitch from 'react-switch';



function Home(){
const [lightStatus, setLightStatus] = useState(false);
const [doorStatus, setDoorStatus] = useState(false);

//Firebase
const [Units, setUnits] = useState([]);
const [loading, setloading] = useState(false);

  const ref = firebase.firestore().collection("Units")
  console.log(ref);



  function getUnits() {
    setloading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const unit = doc.data();
        if (unit.title === "lamp1") {
          const status = unit.status === 0 ? false : true; // if the value is 0 then lamp of
          setLightStatus(status);
        } else if (unit.title === "door1") {
          const status = unit.status === 0 ? false : true; // if the door is 1 then door opend
          setDoorStatus(status);
        }
        items.push(unit);
      });
      setUnits(items);
      setloading(false);
    });
  }

  useEffect(() =>{
    getUnits()
  }, [])


    if(loading){
        return <h1>Loading...</h1>
    }

    const handleUnit = (unit, checked, document) => {
        console.log('Handling unit:', unit);
        console.log('Document:', document);
        const newStatus = checked ? 1 : 0;
        const collectionRef = firebase.firestore().collection("Units").doc(document);

        collectionRef.get()
          .then((doc) => {
            if (doc.exists) {
              collectionRef.update({ status: newStatus })
                .then(() => console.log('Unit status updated'))
                .catch((error) => console.error('Error updating unit status:', error))
            } else {
              console.error('Unit not found in database');
            }
          })
          .catch((error) => console.error('Error reading unit from database:', error))
      } 
      
    




    return (
        <div>
    <div className="center">
      <br />
      <h1 className="shadow"> Unit-Computer </h1>
      <br />

      <h2 className="description"> Light </h2>
    </div>
    <div className="border">
      <br />
      <ReactSwitch
        checked={lightStatus}
        onChange={(checked) => handleUnit({ title: "lamp1" }, checked, "Lamp")}
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
          <img src={light_on} alt="light_on" width="60" height="75" />
        </div>
      }
      {!lightStatus &&
        <div>
          <h3 className="status" style={{ color: "red" }}> Off </h3>
          <img src={light_off} alt="light_off" width="60" height="75" />
        </div>
      }
        <br />
        </div>
        <br />
        <div className="center">
        <h2 className="description"> Door </h2>
        </div>
        <div className="border">
            <br />
            <ReactSwitch
              checked={doorStatus}
              onChange={(checked) => handleUnit({ title: "door1" }, checked, "Door")}
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
                <img src={door_open} alt="door_open" width="60" height="75" />
              </div>
            }
            {!doorStatus &&
              <div>
                <h3 className="status" style={{ color: "red" }}> Closed </h3>
                <img src={door_closed} alt="door_closed" width="60" height="75" />
              </div>
            }
            <br />
          </div>
      
          <br />
        <div className="center">
        <h2 className="description"> Units </h2>
        </div>
        <div className="border">
        {Units.map((unit, index) => (
            <div key={index}>
                <h2>Enhet: {unit.title}</h2>
                <h2>Status: {unit.status}</h2>
            </div>
            ))}
        </div>
        <br />


        </div>
        
    );
};
  
export default Home;