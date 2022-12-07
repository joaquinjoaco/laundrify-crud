import React from 'react';
import { MdClose, MdDeleteOutline } from "react-icons/md";

function ClientEditForm({ setIsEdit, name, address, contact, setName, setAddress, setContact, setClientId, editClient, deleteOrder, error, setError }) {


     return (

          <div className="new-write-popup client">
               <div className="top-container">
                    <p className="card-edit-p">Editar cliente</p>
                    <button className="new-close-btn" onClick={() => {
                         deleteOrder();
                         document.getElementById("cardsWrapper").classList.remove("blur");
                         setIsEdit(false);
                    }}>
                         <MdDeleteOutline className="new-write-popup-icon" />
                    </button>
                    <button className="new-close-btn" onClick={() => {
                         document.getElementById("cardsWrapper").classList.remove("blur");
                         setIsEdit(false);
                         setName("");
                         setAddress("");
                         setContact("");
                         setClientId("");
                         setError("");
                    }}
                    >
                         <MdClose className="new-write-popup-icon" />
                    </button>
               </div>
               <div className="inputs-container">
                    <div className="nickname-container">
                         <label>Cliente</label>
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

                    <button className="new-submit-btn" onClick={editClient}>Editar</button>

               </div>
          </div>
     )
}

export default ClientEditForm