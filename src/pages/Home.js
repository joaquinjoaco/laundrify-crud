import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase-config";
import { collection, getCountFromServer } from "firebase/firestore";

function Home({ isAuth, setShowMobileBar }) {

     const [ordersCount, setOrdersCount] = useState(0);
     const [clientsCount, setClientsCount] = useState(0);

     const countOrderDocs = async () => {
          const coll = collection(db, "pedidos");
          const snapshot = await getCountFromServer(coll);
          setOrdersCount(snapshot.data().count);
     }
     const countClientDocs = async () => {
          const coll = collection(db, "clientes");
          const snapshot = await getCountFromServer(coll);
          setClientsCount(snapshot.data().count);
     }

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
               countOrderDocs();
               countClientDocs();
               console.log("useEffect ran");
          }
          // eslint-disable-next-line
     }, [isAuth])



     return (
          <div className="home">
               <img className="laundrify" src="/images/laundrify.svg" alt="Laundrify" />

               <div className="counter-container">
                    <p className="counter-p"><span className="counter-p-span1">{ordersCount} </span><span className="counter-p-span2">Pedidos</span> registrados</p>
               </div>
               <div className="counter-container">
                    <p className="counter-p"><span className="counter-p-span1">{clientsCount} </span><span className="counter-p-span2">Clientes</span> registrados</p>
               </div>
          </div>
     )
}

export default Home