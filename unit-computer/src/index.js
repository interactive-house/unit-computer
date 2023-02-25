import React from "react"; 
import ReactDOM from "react-dom"; 
import "./index.css";


function Start() {
    return (
      <div className="center">
        <br />
        <h1> Hello World </h1>
        <button>Button </button>
        <br /><br />
        <button>Button </button>
        <br /><br />
        <button>Button </button>
        <br /><br />
        <button>Button </button>
      </div>
      
    );
  }
  
  ReactDOM.render(<Start />, document.getElementById("index"));