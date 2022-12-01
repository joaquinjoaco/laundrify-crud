import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));


  // handle user logout
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };


  return (

    <Router>

      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route exact path="/home" element={<Home isAuth={isAuth} signUserOut={signUserOut} />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
