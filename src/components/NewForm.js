import React from 'react';
import { MdClose } from "react-icons/md";

function NewForm({ setIsHidden, client, address, orderItems, setClient, setAddress, setOrderItems, createPost, error, setError }) {
     return (
          <div id="newWritePopup" className="new-write-popup">
               <div className="top-container">
                    <p className="new-write-p">Nuevo registro</p>
                    <button className="new-close-btn" onClick={() => {
                         setIsHidden(true);
                         document.getElementById("cardsWrapper").classList.remove("blur");
                         setClient("");
                         setAddress("");
                         setOrderItems("");
                         setError("")
                    }}
                    >
                         <MdClose className="new-write-popup-icon" />
                    </button>
               </div>
               <div className="inputs-container">
                    <div className="nickname-container">
                         <label>Cliente</label>
                         <input value={client} onChange={(e) => { setClient(e.target.value) }} type="text" />
                    </div>
                    <div className="sanction-container">
                         <label>Dirección</label>
                         <input value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" />
                    </div>
                    <div className="reason-container">
                         <label>Pedido</label>
                         <textarea value={orderItems} onChange={(e) => { setOrderItems(e.target.value) }} ></textarea>
                    </div>

                    {error ? (<p className="error-p">{error}</p>) : (<></>)}

                    <button className="new-submit-btn" onClick={createPost}>Añadir</button>

               </div>
          </div>
     )
}

export default NewForm