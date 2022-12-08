import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdClose, MdDeleteOutline } from "react-icons/md";
import { db } from '../firebase-config';

function EditForm({ setIsEdit, address, orderItems, setClient, setAddress, setOrderId, setOrderItems, editOrder, deleteOrder, error, setError, isAuth, client }) {

     const [clientsList, setClientsList] = useState([]);
     const clientsCollectionRef = collection(db, "clientes");

     // get the registered orders and stores them in ordersList array
     const getClients = async () => {
          try {
               const data = await getDocs(clientsCollectionRef);
               setClientsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          } catch (error) {
               console.log(error);
          }
     };

     // calls getClients 
     useEffect(() => {
          if (isAuth) {
               getClients();
          }
          // eslint-disable-next-line
     }, [isAuth])

     useEffect(() => {
          let element = document.getElementById("selectClient");
          element.value = client + "," + address;
          console.log(client + "," + address)
          // eslint-disable-next-line
     }, [clientsList])


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
                         {/* <input value={client} onChange={(e) => { setClient(e.target.value) }} type="text" /> */}
                         <select id="selectClient" onChange={(e) => {
                              setClient(e.target.value.split(',')[0]);
                              setAddress(e.target.value.split(',')[1]);
                         }}>
                              {clientsList.map((client) => {
                                   return (
                                        <option key={client.id} value={[client.name, client.address]}>{client.name}</option>
                                   )
                              })}
                              {/* <option value="Pepe">Pepe</option>
                              <option value="Messi">Messi</option> */}
                         </select>
                    </div>
                    <div className="sanction-container">
                         <label>Dirección</label>
                         <input value={address} readOnly
                              // onChange={(e) => { setAddress(e.target.value) }}
                              type="text" />
                    </div>
                    <div className="reason-container">
                         <label>Pedido</label>
                         <p className="reason-p">Separado por comas (ropa1, ropa2, ropa3, ...)</p>
                         <textarea value={orderItems} onChange={(e) => { setOrderItems(e.target.value); }} ></textarea>
                    </div>

                    {error ? (<p className="error-p">{error}</p>) : (<></>)}

                    <button className="new-submit-btn" onClick={editOrder}>Editar</button>

               </div>
          </div>
     )
}

export default EditForm