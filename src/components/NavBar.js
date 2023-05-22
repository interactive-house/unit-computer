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
        <button className="open-popup-button" 
        onClick={togglePopup} 
        style={{ fontWeight: 'bold' }}>
        GET STARTED
        </button>

        </div>
        {isPopupOpen && (
          <div className="overlay">
            <div className="popup">
              <button className="close-button" onClick={togglePopup}>
                X
              </button>
              {currentUser ? (
                <>
                  <h4>Welcome, {currentUser.email}!</h4>
                  <p>Here you can controll the smart home!</p>
                  <h4>How it works:</h4>
                  <p>
                    You controll the each compontens by pressing the buttons.
                    The press will activate/deactivate the correspondig
                    compontens.
                  </p>
                </>
              ) : (
                <>
                  <h4>Get started.</h4>
                  <h4>Already have an account:</h4>
                  <p>Sign in.</p>
                  <h4>No account:</h4>
                  <p>Contact the admin for a validation code.</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
