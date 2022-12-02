import React from 'react'
import { MdSupervisedUserCircle } from "react-icons/md";
import { MdOutlineExitToApp } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineListAlt } from "react-icons/md";
import { NavLink } from 'react-router-dom';
function MobileBar({ signUserOut }) {
     return (
          <nav className="mobile-bar">
               <NavLink to="/" onClick={signUserOut} className={({ isActive }) => (isActive ? 'mobile-bar-link-active' : 'mobile-bar-link')} >
                    <MdOutlineExitToApp className="icon" />
                    <p className="mobile-bar-p">Salir</p>
               </NavLink>
               <NavLink to="/f" className="mobile-bar-link">
                    <MdOutlineHome className="icon" />
                    <p className="mobile-bar-p">Inicio</p>
               </NavLink>
               <NavLink to="/pedidos" className="mobile-bar-link">
                    <MdOutlineListAlt className="icon" />
                    <p className="mobile-bar-p">Pedidos</p>
               </NavLink>
               <NavLink to="/f" className="mobile-bar-link">
                    <MdSupervisedUserCircle className="icon" />
                    <p className="mobile-bar-p">Clientes</p>
               </NavLink>
          </nav>
     )
}

export default MobileBar;