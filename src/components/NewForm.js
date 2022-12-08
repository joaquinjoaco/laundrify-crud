import React, { useEffect, useState } from 'react';
import { db } from "../firebase-config";
import { getDocs, collection } from 'firebase/firestore';
import { MdClose } from "react-icons/md";

function NewForm({ setIsHidden, address, orderItems, setClient, setAddress, setOrderItems, createOrder, error, setError, isAuth }) {

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
               setClient("Elige uno")
               console.log("useEffect ran");
          }
          // eslint-disable-next-line
     }, [isAuth])

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
                         setError("");
                    }}
                    >
                         <MdClose className="new-write-popup-icon" />
                    </button>
               </div>
               <div className="inputs-container">
                    <div className="nickname-container">
                         <label>Cliente</label>
                         {/* <input value={client} onChange={(e) => { setClient(e.target.value) }} type="text" /> */}
                         <select onChange={(e) => {
                              setClient(e.target.value.split(',')[0]);
                              setAddress(e.target.value.split(',')[1]);
                         }}>
                              {clientsList.map((client) => {
                                   return (
                                        <option key={client.id} value={[client.name, client.address]}>{client.name}</option>
                                   )
                              })}
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
                         <textarea value={orderItems} onChange={(e) => { setOrderItems(e.target.value) }} ></textarea>
                    </div>

                    {/* <select className="select-test">

                         {clientsList.map((client) => {
                              return (
                                   <option key={client.id}>{client.name}</option>
                              )
                         })}
                    </select> */}

                    {error ? (<p className="error-p">{error}</p>) : (<></>)}

                    <button className="new-submit-btn" onClick={createOrder}>Añadir</button>

               </div>
          </div>
     )
}

export default NewForm;