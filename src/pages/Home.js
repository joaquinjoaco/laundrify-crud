import React from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Home({ isAuth, signUserOut }) {

     const [isHidden, setIsHidden] = useState(true);
     const [searchInput, setSearchInput] = useState("");


     let navigate = useNavigate();

     // if the user is not authenticated they are going to be redirected to the login page 
     useEffect(() => {
          if (!isAuth) {
               navigate("/");
          }
     }, []);

     return (
          <div className="home">
               {/* {!isAuth ? (
                    <p>logueate papito</p>
               ) : (
                    <button onClick={signUserOut}> Log Out</button>
               )} */}
               <Navbar searchInput={searchInput} setSearchInput={setSearchInput} setIsHidden={setIsHidden} />
          </div>
     )
}

export default Home