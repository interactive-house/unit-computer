import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/NavBar.css";
import { signOut, onAuthStateChanged, getAuth } from "firebase/auth";
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
      const auth = getAuth();
      signOut(auth).then(() => {
        navigate("/");
      });
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
                x
              </button>
              {currentUser ? (
                <>
                  <br />
                  <h4>Welcome, {currentUser.email}!</h4>
                  <p>You now have full access to the smart home!</p>
                  <h4>How does it work?</h4>
                  <p>
                    The switches will activate/deactivate the correspondig
                    components. If you want to listen to music, you can either
                    click on the song you want to play or use the controller
                    buttons. The soil sensor will show you the moisture of the
                    soil.
                  </p>
                </>
              ) : (
                <>
                  <h4>Welcome!</h4>
                  <p>
                    To control the smart house you need an account. If you
                    already have this you can log in with your email and
                    password.
                  </p>
                  <h4>Don´t have an account?</h4>
                  <p>
                    To create an account you need to have access to the
                    validation code. Click on the text below to create your
                    account!
                  </p>{" "}
                  <a href="/register">Create an account!</a>
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
