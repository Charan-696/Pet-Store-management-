import React, { useState, useEffect } from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
const Watchlist = ({ user_id }) => {
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    // Fetch watchlist items from the server
    fetch(`/watchlist`)
      .then((response) => response.json())
      .then((data) => {
        setWatchlistItems(data.watchlistItems);
      })
      .catch((error) => {
        console.error('Error fetching watchlist items:', error);
      });
  }, [user_id]);

  return (
    <div className='pups'>
     <header className='headerr'><h1 className='hh2'> Watchlist</h1></header>
      <div className='jj' >
      {watchlistItems.map((item) => (
        <Item key={item.item_id} item={item} />
      ))}
    </div>
      </div>
    
    
  );
};

export default Watchlist;