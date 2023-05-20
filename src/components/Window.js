import { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import "firebase/database";
import firebase from "./firebase";
import window_open from "../media/window_open.png";
import window_closed from "../media/window_closed.png";

function Window() {
  const [Status, setStatus] = useState(false);

  useEffect(() => {
    const Ref = firebase.database().ref("SmartHomeValueWindow/StatusOfWindow");

    Ref.on("value", (snapshot) => {
      setStatus(snapshot.val().toLowerCase() === "open");
    });

    return () => {
      Ref.off();
    };
  }, []);

  const handleToggle = (checked) => {
    firebase
      .database()
      .ref("/SmartHomeValueWindow/StatusOfWindow")
      .set(checked ? "open" : "closed");
  };

  return (
    <div className="center">
      <h2 className="description"> Window </h2>

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
            <h3 className="status"> Open</h3>
            <img src={window_open} alt="window_open" width="230" height="200" />
          </div>
        )}
        {!Status && (
          <div>
            <h3 className="status" style={{ color: "red" }}>
              {" "}
              Closed{" "}
            </h3>
            <img
              src={window_closed}
              alt="window_open"
              width="230"
              height="200"
            />
          </div>
        )}
        <br />
      </div>
      <br />
    </div>
  );
}

export default Window;
