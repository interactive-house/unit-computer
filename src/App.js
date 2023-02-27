import './App.css';
import light_on from "./media/light_on.png"
import light_off from "./media/light_off.png"

function App() {
  
  return (
    <div className="center">
      <br />
      <h1> Unit-Computer </h1>
      <button>Button Light </button>        
      <br /><br />
      <img src={light_on} alt="light_on" width="104" height="142" />
      <br /><br />
      <img src={light_off} alt="light_off" width="104" height="142" />
      </div>
    
  );
}

export default App;
