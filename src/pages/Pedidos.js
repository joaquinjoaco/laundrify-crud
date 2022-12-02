import React from 'react'
import Searchbar from '../components/Searchbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import Cards from '../components/Cards';

function Pedidos({ isAuth, setShowMobileBar }) {
     const [ordersList, setOrdersList] = useState([]);
     const ordersCollectionRef = collection(db, "pedidos");
     // eslint-disable-next-line
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

     const createPost = async () => {
          await addDoc(ordersCollectionRef, {
               // title,
               // postText,
               // author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
          });
          navigate("/");
     };


     // deletes an order with the given 'id'
     const deletePost = async (id) => {
          const postDoc = doc(db, "pedidos", id);
          await deleteDoc(postDoc);
          getOrders();
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
          getOrders();
          console.log(ordersList);
          console.log("sex ran");
     }, [isAuth])

     return (
          <div className="home">
               {/* Top searchbar */}
               <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} setIsHidden={setIsHidden} />
               {/* orderList is shown as a grid of Cards */}
               <Cards ordersList={ordersList} />

          </div >
     )
}

export default Pedidos;