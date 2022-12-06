import React from 'react';
import { MdClose, MdDeleteOutline } from "react-icons/md";

function EditForm({ setIsEdit, client, address, orderItems, setClient, setAddress, setOrderId, setOrderItems, editPost, deleteOrder, error, setError }) {


     return (

          <div className="new-write-popup">
               <div className="top-container">
                    <p className="card-edit-p">Editar registro</p>
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
                         setClient("");
                         setAddress("");
                         setOrderId("");
                         setOrderItems("");
                         setError("");
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
                         <p className="reason-p">Separado por comas (ropa1, ropa2, ropa3, ...)</p>
                         <textarea value={orderItems} onChange={(e) => { setOrderItems(e.target.value) }} ></textarea>
                    </div>

                    {error ? (<p className="error-p">{error}</p>) : (<></>)}

                    <button className="new-submit-btn" onClick={editPost}>Editar</button>

               </div>
          </div>
     )
}

export default EditForm