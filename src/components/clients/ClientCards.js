import React from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';


function ClientCards({ filteredItems, handleUpdate }) {

     return (
          <div id="cardsWrapper" className="cards-wrapper">
               {filteredItems.map((client) => {
                    return (
                         <div className="card" key={client.id}>
                              <div className="card-top-container">
                                   <h1> {client.name}</h1>
                                   <button className="card-update-btn" onClick={() => { handleUpdate(client.name, client.address, client.contact, client.id) }}>
                                        <MdOutlineModeEdit className="card-icon" />
                                   </button>
                              </div>
                              <h2 className="card-address">{client.address}</h2>
                              <div className="card-bottom-container">
                                   <p className="card-contact">{client.contact}</p>
                              </div>
                         </div>
                    );
               })}
          </div>

     )
}

export default ClientCards;