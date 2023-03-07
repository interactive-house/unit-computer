import light_on from "../media/light_on.png"
import light_off from "../media/light_off.png"
import door_open from "../media/door_open.png"
import door_closed from "../media/door_closed.png"
import "../style/Home.css"

import React, { 
    useState, 
    useEffect 
} from 'react';

import ReactSwitch from 'react-switch';



function Home(){
    const [checked, setChecked] = useState(true);

    const handleChange = (checked) => {
        setChecked(checked);
    }

    const [door, setDoor] = useState(true);

    const handleDoor = (checked) => {
        setDoor(checked);
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
            checked={checked}
            onChange={handleChange}
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
        {checked &&
        <div>
        <h3 className="status"> On </h3>
        <img src={light_on} alt="light_on" width="60" height="75" />
        </div>
        }
        {!checked &&
        <div>
        <h3 className="status"> Off </h3>
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
            checked={door}
            onChange={handleDoor}
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
        {door &&
        <div>
        <h3 className="status"> Open </h3>
        <img src={door_open} alt="light_on" width="80" height="150" />
        </div>
        }
        {!door &&
        <div>
        <h3 className="status"> Closed </h3>
        <img src={door_closed} alt="light_off" width="80" height="150" />
        </div>
        }
        <br />
        </div>


        </div>
        
    );
};
  
export default Home;