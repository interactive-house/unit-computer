import { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import "firebase/database";
import firebase from "./firebase";
import light_on from "../media/light_on.png";
import light_off from "../media/light_off.png";

function Light() {
  const [Status, setStatus] = useState(false);

  useEffect(() => {
    const Ref = firebase.database().ref("SmartHomeValueLight/StatusOflight");

    Ref.on("value", (snapshot) => {
      setStatus(snapshot.val() === "on");
    });

    return () => {
      Ref.off();
    };
  }, []);

  const handleToggle = (checked) => {
    firebase
      .database()
      .ref("SmartHomeValueLight/StatusOflight")
      .set(checked ? "on" : "off");
  };

  return (
    <div className="center">
      <h2 className="description">Light</h2>
      <div />
      <div className="border">
        <br />
        <ReactSwitch
          checked={Status}
          onChange={handleToggle}
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
        {Status && (
          <div>
            <h3 className="status"> On </h3>
            <img src={light_on} alt="light_on" width="80" height="100" />
          </div>
        )}
        {!Status && (
          <div>
            <h3 className="status" style={{ color: "rgb(168, 30, 30)"}}>
              {" "}
              Off{" "}
            </h3>
            <img src={light_off} alt="light_off" width="80" height="100" />
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default Light;
