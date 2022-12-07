import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { MdArrowUpward } from 'react-icons/md';
import Cards from '../components/Cards';
import NewForm from '../components/NewForm';
import EditForm from '../components/EditForm';
import Searchbar from '../components/Searchbar';


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
          console.log(orderItems);
          setOrderId(tempId);
          document.getElementById("cardsWrapper").classList.add("blur");
          setIsEdit(true);
     }

     const editOrder = async () => {
          if (isAuth) { // Checks if user is authenticated
               if (client !== '' & address !== '' & orderItems !== '') {
                    // checks if orderItems is already an array so that it doesn't try to split it again.
                    let orderItemsArray = orderItems;
                    if (!Array.isArray(orderItems)) {
                         // if it's not an array already (meaning it has been edited in the form), this will split it into one.
                         orderItemsArray = orderItems.split(',');
                    }

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


     // creates an array with the filtered items according to the input in the searchbar 
     // this array is passed to the cards components
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
          <div className="pedidos">
               {/* Top searchbar */}
               <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} setIsHidden={setIsHidden} />
               {/* to-the-top button */}
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
                    editOrder={editOrder}
                    deleteOrder={deleteOrder}
                    error={error}
                    setError={setError}
               />}

               {/* orderList filteredItems is shown as a grid of Cards */}
               <Cards filteredItems={filteredItems} handleUpdate={handleUpdate} />

          </div >
     )
}

export default Pedidos;