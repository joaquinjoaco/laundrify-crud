import React from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';


function Cards({ ordersList, filteredItems }) {
     return (
          <div id="cardsWrapper" className="cards-wrapper">
               {filteredItems.map((order) => {
                    return (
                         <div className="card" key={order.id}>
                              <div className="card-top-container">
                                   <h1> {order.client}</h1>
                                   <button className="card-update-btn">
                                        <MdOutlineModeEdit className="card-icon" />
                                   </button>
                              </div>
                              <h2 className="card-address">{order.address}</h2>
                              {/* <p className="card-item">{order.description}</p> */}
                              {order.items.map((item) => {
                                   return (
                                        <p className="card-item" key={item}>{item}</p>
                                   )
                              })}
                              <div className="card-bottom-container">
                                   <p className="card-date">{order.date}</p>
                              </div>



                         </div>
                    );
               })}
          </div>

     )
}

export default Cards