import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [lastActivity, setLastActivity] = useState(new Date());
  const [userActive, setUserActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [trackedActivity, setTrackedActivity] = useState(false);

  useEffect(() => {
    const logUserActivity = (event) => {

      setUserActive(true);
      if (
        event.type === "mousemove" ||
        event.type === "keypress" ||
        event.type === "scroll" ||
        event.type === "click"
      ) {
        setTrackedActivity(true);
      }
    };
    document.addEventListener("mousemove", logUserActivity);
    document.addEventListener("keypress", logUserActivity);
    document.addEventListener("scroll", logUserActivity);
    document.addEventListener("click", logUserActivity);
    return () => {
      document.removeEventListener("mousemove", logUserActivity);
      document.removeEventListener("keypress", logUserActivity);
      document.removeEventListener("scroll", logUserActivity);
      document.removeEventListener("click", logUserActivity);
    };
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    let timerId = null;
    if (loggedIn) {
      if (!userActive) {

        timerId = setTimeout(() => {
          const currentTime = new Date();
          const diffInSeconds = (currentTime - lastActivity) / 1000;

          if (
            diffInSeconds >
            300 // 5 minutes
          ) {
           
            const auth = getAuth();
            signOut(auth).then(() => {
              // Redirect the user to the login page
              window.location.href = "/login";
              // Show an alert to notify the user that they have been logged out
              alert("You will be logged out due to inactivity.");
            });
          }
        }, 15000);
      } else {
        setLastActivity(new Date());
        setUserActive(false);
        setTrackedActivity(false);
      }
    }
    return () => clearTimeout(timerId);
  }, [lastActivity, userActive, trackedActivity, loggedIn]);

  const handleUserActivity = () => {
    setLastActivity(new Date());
    setUserActive(false);
    setTrackedActivity(false);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<Home onActivity={handleUserActivity} />}
          />
          <Route
            path="/login"
            element={<Login onActivity={handleUserActivity} />}
          />

          {/*If path is not found, redirect to Home*/}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
