import React from 'react';
import { MdClose } from "react-icons/md";

function ClientNewForm({ setIsHidden, name, address, contact, setName, setAddress, setContact, createClient, error, setError }) {
     return (
          <div id="newWritePopup" className="new-write-popup client">
               <div className="top-container">
                    <p className="new-write-p">Nuevo registro</p>
                    <button className="new-close-btn" onClick={() => {
                         setIsHidden(true);
                         document.getElementById("cardsWrapper").classList.remove("blur");
                         setName("");
                         setAddress("");
                         setContact("");
                         setError("");
                    }}
                    >
                         <MdClose className="new-write-popup-icon" />
                    </button>
               </div>
               <div className="inputs-container">
                    <div className="nickname-container">
                         <label>Nombre</label>
                         <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" />
                    </div>
                    <div className="sanction-container">
                         <label>Dirección</label>
                         <input value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" />
                    </div>
                    <div className="sanction-container">
                         <label>Contacto</label>
                         <input value={contact} onChange={(e) => { setContact(e.target.value) }} ></input>
                    </div>

                    {error ? (<p className="error-p">{error}</p>) : (<></>)}

                    <button className="new-submit-btn" onClick={createClient}>Añadir</button>

               </div>
          </div>
     )
}

export default ClientNewForm;