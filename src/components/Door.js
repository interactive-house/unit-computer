import { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import "firebase/database";
import firebase from "./firebase";
import door_open from "../media/door_open.png";
import door_closed from "../media/door_closed.png";

function Door() {
  const [Status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Ref = firebase.database().ref("SmartHomeValueDoor/StatusOfDoor");

    Ref.on("value", (snapshot) => {
      setStatus(snapshot.val().toLowerCase() === "open");
    });

    return () => {
      Ref.off();
    };
  }, []);

  const handleToggle = () => {
    if (Status === true) {
      firebase
      .database()
      .ref("SmartHomeValueDoor/StatusOfDoor")
      .set("closed");
    } else {
      firebase
      .database()
      .ref("SmartHomeValueDoor/StatusOfDoor")
      .set("open");
    }
  };

  useEffect(() => {
    if (Status !== null) {
      setLoading(false);
    }
  }, [Status]);

  if (loading) {
    return (
      <div className="center">
        <h2 className="description">Door</h2>
        <div className="loadingBorder">
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <h2 className="description">Door</h2>
      <div />
      <div className={`Status ${Status === false ? "border" : "borderOn"}`}>
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
            <img src={door_open} alt="door_open" width="120" height="225" onClick={() => handleToggle()}/>
          </div>
        )}
        {!Status && (
          <div>
            <h3 className="status" style={{ color: "red" }}>
              {" "}
              Closed{" "}
            </h3>
            <img src={door_closed} alt="door_closed" width="120" height="225" onClick={() => handleToggle()}/>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default Door;
