import './App.css';
import light_on from "./media/light_on.png"
import light_off from "./media/light_off.png"

import React, { useEffect, useState } from 'react';
import firebase from './firebase';

function App() {
  const [Units, setUnits] = useState([])
  const [loading, setloading] = useState([false])

  const ref = firebase.firestore().collection("Units")
  console.log(ref);

  function getUnits(){
    setloading(true)
    ref.onSnapshot((querySnapshot) =>{
      const items = []
      querySnapshot.forEach((doc) =>{
        items.push(doc.data())
      })
      setUnits(items)
      setloading(false)

    })
  }

  useEffect(() =>{
    getUnits()
  }, [])
  if(loading){
    return <h1>Loading...</h1>
  }
  




  return (
    <div className="center">
      <br />
      <h1> Unit-Computer </h1>
      <button>Button Light </button>        
      <br /><br />
      <img src={light_on} alt="light_on" width="104" height="142" />
      <br /><br />
      <img src={light_off} alt="light_off" width="104" height="142" />
      <h1>Units:</h1>
      {Units.map((Units) =>(
        <div key={Units.id}>
          <h2>{Units.title}</h2>
          <h2>{Units.status}</h2>
      
          </div>
      ))}

      </div>
    
  );
}

export default App;
