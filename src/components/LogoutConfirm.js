import React from 'react'
import { useLocation } from 'react-router-dom';

function LogoutConfirm({ signUserOut, setLogoutConfirm }) {

     const location = useLocation();

     return (
          <div className="logout-confirmation">
               <h1 className="logout-h1">¿Desea cerrar sesión?</h1>
               <div className="logout-bottom-container">
                    <button className="logout-btn" onClick={signUserOut}>Si</button>
                    <button className="logout-btn" onClick={() => {
                         setLogoutConfirm(false);
                         if (location.pathname === '/clientes' || location.pathname === '/pedidos') {
                              document.getElementById("cardsWrapper").classList.remove("blur");
                         };
                    }}>Cancelar</button>
               </div>
          </div>
     )
}

export default LogoutConfirm;