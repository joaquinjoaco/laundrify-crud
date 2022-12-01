import React from 'react';
import { BiSearch } from "react-icons/bi";

function Navbar({ searchInput, setSearchInput, setIsHidden }) {

     return (
          <div className="nav-wrapper">
               <p className="nav-p">Busca un pedido...</p>
               <nav>
                    <div className="search-bar">
                         <BiSearch className="icon" />
                         <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} type="text" />
                    </div>
                    {/* Shows the inputs onClick. */}
                    <button className="add-button" onClick={
                         () => {
                              setIsHidden(false);
                              document.getElementById("cardsWrapper").classList.add("blur");
                         }
                    }>
                         Nuevo
                    </button>
               </nav>
               <p className="nav-p">o registra uno.</p>
          </div>
     )
}

export default Navbar;