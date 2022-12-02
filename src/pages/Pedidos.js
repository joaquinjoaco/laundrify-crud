import React from 'react'
import Searchbar from '../components/Searchbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import Cards from '../components/Cards';
import NewForm from '../components/NewForm';

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
     const [orderItems, setOrderItems] = useState("")
     const [ordersList, setOrdersList] = useState([]);
     const ordersCollectionRef = collection(db, "pedidos");
     const [isHidden, setIsHidden] = useState(true);
     const [searchInput, setSearchInput] = useState("");
     const [error, setError] = useState("");

     // get the registered orders and stores them in ordersList array
     const getOrders = async () => {
          try {
               const data = await getDocs(ordersCollectionRef);
               setOrdersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

          } catch (error) {
               console.log(error);
          }
     };

     const createPost = async () => {

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
               setError("")
               // refetches the data
               getOrders();

          } else {
               setError("Hay campos vacíos.")
          }



     };


     // deletes an order with the given 'id'
     // const deletePost = async (id) => {
     //      const postDoc = doc(db, "pedidos", id);
     //      await deleteDoc(postDoc);
     //      getOrders();
     // };


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
          getOrders();
          console.log("useEffect ran");
          // eslint-disable-next-line
     }, [isAuth])


     const filteredItems = getFilteredItems(searchInput, ordersList);


     return (
          <div className="home">
               {/* Top searchbar */}
               <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} setIsHidden={setIsHidden} />
               {/* Hidden form to add a new order */}
               {!isHidden && <NewForm
                    setIsHidden={setIsHidden}
                    client={client}
                    address={address}
                    orderItems={orderItems}
                    setClient={setClient}
                    setAddress={setAddress}
                    setOrderItems={setOrderItems}
                    createPost={createPost}
                    error={error}
                    setError={setError}
               />}
               {/* orderList is shown as a grid of Cards */}
               <Cards ordersList={ordersList} filteredItems={filteredItems} />

          </div >
     )
}

export default Pedidos;