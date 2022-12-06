import React from 'react';
import { BiSearch } from "react-icons/bi";

function Searchbar({ searchInput, setSearchInput, setIsHidden }) {

     // Sticky bar
     window.addEventListener("scroll", function () {
          var header = document.querySelector("header");
          header.classList.toggle("sticky", window.scrollY > 45);
     })

     return (
          <header id="navWrapper" className="nav-wrapper">
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
          </header>
     )
}

export default Searchbar;