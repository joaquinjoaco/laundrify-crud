import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pedidos from "./pages/Pedidos";
import MobileBar from "./components/MobileBar";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [showMobileBar, setShowMobileBar] = useState(false);


  // handle user logout
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  return (

    <Router>

      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login isAuth={isAuth} setIsAuth={setIsAuth} setShowMobileBar={setShowMobileBar} />} />
          <Route exact path="/home" element={<NotFound setShowMobileBar={setShowMobileBar} isAuth={isAuth} />} />
          <Route exact path="/pedidos" element={<Pedidos isAuth={isAuth} signUserOut={signUserOut} setShowMobileBar={setShowMobileBar} />} />
          <Route exact path="/clientes" element={<NotFound setShowMobileBar={setShowMobileBar} isAuth={isAuth} />} />
          <Route exact path="*" element={<NotFound setShowMobileBar={setShowMobileBar} isAuth={isAuth} />} />
        </Routes>

        {showMobileBar && <MobileBar signUserOut={signUserOut} />}

      </div>
    </Router>
  );
}

export default App;
