import React from 'react'
import Searchbar from '../components/Searchbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Pedidos({ isAuth, setShowMobileBar }) {
     // eslint-disable-next-line
     const [isHidden, setIsHidden] = useState(true);
     const [searchInput, setSearchInput] = useState("");



     // if the user is not authenticated they are going to be redirected to the login page 
     let navigate = useNavigate();
     useEffect(() => {
          setShowMobileBar(true);
          if (!isAuth) {
               navigate("/");
          }
     });

     return (
          <div className="home">
               <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} setIsHidden={setIsHidden} />
          </div>
     )
}

export default Pedidos;