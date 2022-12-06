import React from 'react'

function LogoutConfirm({ signUserOut, setLogoutConfirm }) {
     return (
          <div className="logout-confirmation">
               <h1 className="logout-h1">¿Desea cerrar sesión?</h1>
               <div className="logout-bottom-container">
                    <button className="logout-btn" onClick={signUserOut}>Si</button>
                    <button className="logout-btn" onClick={() => {
                         setLogoutConfirm(false);
                         document.getElementById("cardsWrapper").classList.remove("blur");
                    }}>Cancelar</button>
               </div>
          </div>
     )
}

export default LogoutConfirm;