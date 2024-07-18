import React, { useState } from 'react';
const Item = ({ item }) => {
  const [message, setMessage] = useState('');

  
const addToWatchlist = () => {
  // Send a POST request to add the item to the Watchlist table
  fetch('/addtowatchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 1, // Replace with the actual user ID
      item_id: item.item_id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setMessage('Watchlist updated successfully');
      } else {
        setMessage('Error adding item to Watchlist');
      }
    })
    .catch((error) => {
      console.error('Error adding item to Watchlist:', error);
      setMessage('Error adding item to Watchlist');
    });
};


  return (
    <div className="Box12">
    <div>
      
      <img className='Logo' src={item.image} alt={item.item_name} />
      <div className="infooo">
      <h2 className='gg'>{item.item_name}</h2>
        <p className="mm">Description: {item.description}</p>
      <p className="mm">Starting Price: {item.starting_price}</p>
      <button className="Ratting1" onClick={addToWatchlist}><h2 className='nothing'>Add to wishlist</h2></button>
      <p >{message}</p>
      </div>
      
      
    
    </div>
  </div>
    
    
  );
}

export default Item;