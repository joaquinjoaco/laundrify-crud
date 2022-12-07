import React from 'react'
import { MdSupervisedUserCircle, MdOutlineExitToApp, MdOutlineHome, MdOutlineListAlt } from "react-icons/md";
import { NavLink, useLocation } from 'react-router-dom';


function MobileBar({ setLogoutConfirm }) {

     const location = useLocation();

     return (
          <nav className="mobile-bar">
               <button onClick={() => {
                    setLogoutConfirm(true);
                    if (location.pathname === '/clientes' || location.pathname === '/pedidos') {
                         document.getElementById("cardsWrapper").classList.add("blur");
                    }
               }} className="mobile-bar-link" >
                    <MdOutlineExitToApp className="icon" />
                    <p className="mobile-bar-p">Salir</p>
               </button>
               <NavLink to="/home" className={({ isActive }) => (isActive ? 'mobile-bar-link-active' : 'mobile-bar-link')}>
                    <MdOutlineHome className="icon" />
                    <p className="mobile-bar-p">Inicio</p>
               </NavLink>
               <NavLink to="/pedidos" className={({ isActive }) => (isActive ? 'mobile-bar-link-active' : 'mobile-bar-link')}>
                    <MdOutlineListAlt className="icon" />
                    <p className="mobile-bar-p">Pedidos</p>
               </NavLink>
               <NavLink to="/clientes" className={({ isActive }) => (isActive ? 'mobile-bar-link-active' : 'mobile-bar-link')}>
                    <MdSupervisedUserCircle className="icon" />
                    <p className="mobile-bar-p">Clientes</p>
               </NavLink>
          </nav>
     )
}

export default MobileBar;