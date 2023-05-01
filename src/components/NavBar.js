import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/NavBar.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handlePopstate = () => {
      signOut(auth);
    };

    window.addEventListener("popstate", handlePopstate);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      window.removeEventListener("popstate", handlePopstate);
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="center">
      <br />
      <h1 className="shadow">Unit-Computer</h1>
      <nav>
        <ul>
          {currentUser && (
            <li className="user-info">
              <h3>{currentUser.email}</h3>
              <button onClick={handleSignOut}>SIGN OUT</button>
            </li>
          )}
        </ul>
      </nav>
  
      <div className="popup-container">
        <div className="open-popup-button-container">
        <button className="open-popup-button" onClick={togglePopup}>GET STARTED</button>

        </div>
        {isPopupOpen && (
          <div className="overlay">
            <div className="popup">
              <button className="close-button" onClick={togglePopup}>
                X
              </button>
              <h2>Get started.</h2>
              <p>hello hello hello hello hello hello hello hello hello hello hello hello hello</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
}

export default Navbar;
