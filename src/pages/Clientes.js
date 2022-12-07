import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { MdArrowUpward } from 'react-icons/md';
import ClientCards from '../components/clients/ClientCards';
import ClientSearchbar from '../components/clients/ClientSearchbar';
import ClientNewForm from '../components/clients/ClientNewForm';
import ClientEditForm from '../components/clients/ClientEditForm';


// filters clients
const getFilteredItems = (query, clients) => {
     if (!query) {
          return clients;
     }
     return clients.filter((client) => client.name.toLowerCase().includes(query.toLowerCase()) || client.address.toLowerCase().includes(query.toLowerCase()) || client.contact.toLowerCase().includes(query.toLowerCase()));
};



function Clientes({ isAuth, setShowMobileBar }) {
     const [address, setAddress] = useState("");
     const [name, setName] = useState("");
     const [contact, setContact] = useState("");
     const [clientId, setClientId] = useState("");
     const [clientsList, setClientsList] = useState([]);

     const clientsCollectionRef = collection(db, "clientes");

     const [error, setError] = useState("");
     const [isEdit, setIsEdit] = useState(false);
     const [isHidden, setIsHidden] = useState(true);

     const [searchInput, setSearchInput] = useState("");

     // get the registered orders and stores them in ordersList array
     const getClients = async () => {
          try {
               const data = await getDocs(clientsCollectionRef);
               setClientsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          } catch (error) {
               console.log(error);
          }
     };



     // creates an array with the filtered items according to the input in the searchbar 
     // this array is passed to the cards components
     const filteredItems = getFilteredItems(searchInput, clientsList);

     // if the user is not authenticated they are going to be redirected to the login page 
     let navigate = useNavigate();
     useEffect(() => {
          setShowMobileBar(true);
          if (!isAuth) {
               navigate("/");
          }
     });


     // calls getClients 
     useEffect(() => {
          if (isAuth) {
               getClients();
               console.log("useEffect ran");
          }
          // eslint-disable-next-line
     }, [isAuth])



     const createClient = async () => {
          if (isAuth) { // Checks if user is authenticated
               if (name !== '' & address !== '' & contact !== '') {
                    await addDoc(clientsCollectionRef, {
                         name,
                         address,
                         contact
                    });

                    setIsHidden(true);
                    document.getElementById("cardsWrapper").classList.remove("blur");
                    setName("");
                    setAddress("");
                    setContact("")
                    setError("");
                    // refetches the data after 500ms
                    setTimeout(() => {
                         getClients();
                    }, 500);

               } else {
                    setError("Hay campos vacíos.");
               }
          }

     };


     // Receives the data from a specific card to be updated on the edit-form
     const handleUpdate = (tempName, tempAddress, tempContact, tempId) => {
          setName(tempName);
          setAddress(tempAddress);
          setContact(tempContact)
          setClientId(tempId);
          document.getElementById("cardsWrapper").classList.add("blur");
          setIsEdit(true);
     }

     const editClient = async () => {
          if (isAuth) { // Checks if user is authenticated
               if (name !== '' & address !== '' & contact !== '') {
                    const clientDoc = doc(db, "clientes", clientId);
                    await updateDoc(clientDoc, {
                         name,
                         address,
                         contact
                    });

                    document.getElementById("cardsWrapper").classList.remove("blur");
                    setIsEdit(false);
                    setName("");
                    setAddress("");
                    setContact("");
                    setClientId("");
                    setError("");
                    // refetches the data after 500ms
                    setTimeout(() => {
                         getClients();
                    }, 500);

               } else {
                    setError("Hay campos vacíos.")
               }
          }
     }



     // deletes an order with the given 'id'
     const deleteOrder = async () => {
          if (isAuth) { // Checks if user is authenticated
               const clientDoc = doc(db, "clientes", clientId);
               await deleteDoc(clientDoc);
               getClients();
          }
     };




     // scroll-to-top button
     window.addEventListener("scroll", function () {
          var topButton = document.getElementById("topButton")
          topButton.classList.toggle("shown", window.scrollY > 100);
     })

     const scrollTop = () => {
          window.scrollTo(0, window.scrollY - window.scrollY);
          console.log("sex");
     }

     return (
          <div className="clientes">
               {/* Top searchbar */}
               <ClientSearchbar searchInput={searchInput} setSearchInput={setSearchInput} setIsHidden={setIsHidden} />
               {/* to-the-top button */}
               <div className="top-button" id="topButton" onClick={scrollTop}>
                    <MdArrowUpward className="top-button-icon" />
               </div>

               {/* Hidden form to add a new client */}
               {!isHidden && <ClientNewForm
                    setIsHidden={setIsHidden}
                    name={name}
                    address={address}
                    contact={contact}
                    setName={setName}
                    setAddress={setAddress}
                    setContact={setContact}
                    createClient={createClient}
                    error={error}
                    setError={setError}
               />}

               {/* Hidden form to edit a client */}
               {isEdit && <ClientEditForm
                    setIsEdit={setIsEdit}
                    name={name}
                    address={address}
                    contact={contact}
                    setName={setName}
                    setAddress={setAddress}
                    setContact={setContact}
                    setClientId={setClientId}
                    editClient={editClient}
                    deleteOrder={deleteOrder}
                    error={error}
                    setError={setError}
               />}

               {/* clientsList filteredItems is shown as a grid of Cards */}
               <ClientCards filteredItems={filteredItems} handleUpdate={handleUpdate} />
          </div >
     )
}

export default Clientes;