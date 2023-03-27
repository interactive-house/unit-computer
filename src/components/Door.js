import { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import "firebase/database";
import firebase from "./firebase";
import door_open from "../media/door_open.png";
import door_closed from "../media/door_closed.png";

function Door() {
  const [Status, setStatus] = useState(false);

  useEffect(() => {
    const Ref = firebase.database().ref("SmartHomeValueDoor/StatusOfDoor");

    Ref.on("value", (snapshot) => {
      setStatus(snapshot.val() === "open");
    });

    return () => {
      Ref.off();
    };
  }, []);

  const handleToggle = (checked) => {
    firebase
      .database()
      .ref("SmartHomeValueDoor/StatusOfDoor")
      .set(checked ? "open" : "closed");
  };

  return (
    <div className="center">
      <h2 className="description">Door</h2>
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
            <h3 className="status"> Open </h3>
            <img src={door_open} alt="door_open" width="80" height="150" />
          </div>
        )}
        {!Status && (
          <div>
            <h3 className="status" style={{ color: "rgb(168, 30, 30)" }}>
              {" "}
              Closed{" "}
            </h3>
            <img src={door_closed} alt="door_closed" width="80" height="150" />
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default Door;
