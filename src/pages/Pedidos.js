import React from 'react'
import Searchbar from '../components/Searchbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Cards from '../components/Cards';
import NewForm from '../components/NewForm';
import { MdArrowUpward } from 'react-icons/md';
import EditForm from '../components/EditForm';

// filters orders 
const getFilteredItems = (query, ordersList) => {
     if (!query) {
          return ordersList;
     }
     return ordersList.filter((order) => order.client.toLowerCase().includes(query.toLowerCase()) || order.address.toLowerCase().includes(query.toLowerCase()));
};



function Pedidos({ isAuth, setShowMobileBar }) {
     const [address, setAddress] = useState("");
     const [client, setClient] = useState("");
     const [orderId, setOrderId] = useState("");
     const [orderItems, setOrderItems] = useState("");
     const [ordersList, setOrdersList] = useState([]);

     const ordersCollectionRef = collection(db, "pedidos");

     const [error, setError] = useState("");
     const [isEdit, setIsEdit] = useState(false);
     const [isHidden, setIsHidden] = useState(true);

     const [searchInput, setSearchInput] = useState("");

     // get the registered orders and stores them in ordersList array
     const getOrders = async () => {
          try {
               const data = await getDocs(ordersCollectionRef);
               setOrdersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

          } catch (error) {
               console.log(error);
          }
     };

     const createOrder = async () => {
          if (isAuth) { // Checks if user is authenticated
               let newDate = new Date()
               let date = newDate.getDate();
               let month = newDate.getMonth() + 1;
               let year = newDate.getFullYear();
               const fullDate = `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;

               const orderItemsArray = orderItems.split(',');
               if (client !== '' & address !== '' & orderItems !== '') {
                    await addDoc(ordersCollectionRef, {
                         client,
                         address,
                         date: fullDate,
                         items: orderItemsArray,
                         // author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
                    });

                    setIsHidden(true);
                    document.getElementById("cardsWrapper").classList.remove("blur");
                    setClient("");
                    setAddress("");
                    setOrderItems("");
                    setError("");
                    // refetches the data after 500ms
                    setTimeout(() => {
                         getOrders();
                    }, 500);

               } else {
                    setError("Hay campos vacíos.");
               }
          }

     };


     // Receives the data from a specific card to be updated on the edit-form
     const handleUpdate = (tempClient, tempAddress, tempItems, tempId) => {
          setClient(tempClient);
          setAddress(tempAddress);
          setOrderItems(tempItems);
          setOrderId(tempId);
          document.getElementById("cardsWrapper").classList.add("blur");
          setIsEdit(true);
     }

     const editPost = async () => {
          if (isAuth) { // Checks if user is authenticated
               if (client !== '' & address !== '' & orderItems !== '') {
                    const orderItemsArray = orderItems.split(',');
                    const orderDoc = doc(db, "pedidos", orderId);
                    await updateDoc(orderDoc, {
                         address,
                         client,
                         items: orderItemsArray
                    });

                    document.getElementById("cardsWrapper").classList.remove("blur");
                    setIsEdit(false);
                    setClient("");
                    setAddress("");
                    setOrderId("");
                    setOrderItems("");
                    setError("");
                    // refetches the data after 500ms
                    setTimeout(() => {
                         getOrders();
                    }, 500);

               } else {
                    setError("Hay campos vacíos.")
               }
          }
     }


     // deletes an order with the given 'id'
     const deleteOrder = async () => {
          if (isAuth) { // Checks if user is authenticated
               const orderDoc = doc(db, "pedidos", orderId);
               await deleteDoc(orderDoc);
               getOrders();
          }
     };


     // if the user is not authenticated they are going to be redirected to the login page 
     let navigate = useNavigate();
     useEffect(() => {
          setShowMobileBar(true);
          if (!isAuth) {
               navigate("/");
          }
     });


     // calls getOrders 
     useEffect(() => {
          if (isAuth) {
               getOrders();
               console.log("useEffect ran");
          }
          // eslint-disable-next-line
     }, [isAuth])


     const filteredItems = getFilteredItems(searchInput, ordersList);

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
          <div className="home">
               {/* Top searchbar */}
               <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} setIsHidden={setIsHidden} />
               <div className="top-button" id="topButton" onClick={scrollTop}>
                    <MdArrowUpward className="top-button-icon" />
               </div>

               {/* Hidden form to add a new order */}
               {!isHidden && <NewForm
                    setIsHidden={setIsHidden}
                    client={client}
                    address={address}
                    orderItems={orderItems}
                    setClient={setClient}
                    setAddress={setAddress}
                    setOrderItems={setOrderItems}
                    createOrder={createOrder}
                    deleteOrder={deleteOrder}
                    error={error}
                    setError={setError}
               />}

               {/* Hidden form to edit an order */}
               {isEdit && <EditForm
                    setIsEdit={setIsEdit}
                    client={client}
                    address={address}
                    orderItems={orderItems}
                    setClient={setClient}
                    setAddress={setAddress}
                    setOrderId={setOrderId}
                    setOrderItems={setOrderItems}
                    editPost={editPost}
                    deleteOrder={deleteOrder}
                    error={error}
                    setError={setError}
               />}

               {/* orderList is shown as a grid of Cards */}
               <Cards filteredItems={filteredItems} handleUpdate={handleUpdate} />

          </div >
     )
}

export default Pedidos;