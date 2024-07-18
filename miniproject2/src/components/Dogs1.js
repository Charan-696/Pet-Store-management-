import React, { useState, useEffect } from 'react';
import Item from './Item';

const Dogs1 = () => {
  const [items, setItems] = useState([]);
  const categoryIdToDisplay = 1;

  useEffect(() => {
    fetch('/items')
      .then((response) => response.json())
      .then((data) => {
        // Filter items based on the desired category ID
        const filteredItems = data.filter((item) => item.category_id === categoryIdToDisplay);
        setItems(filteredItems);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return( <div className="pups">
  <header className='headerr'><h1 className='hh2'>DOGS</h1></header>
    <div className='jj'>
     
        
        {items.map((item) => (
          <Item key={item.item_id} item={item} />
        ))}
      
    </div>
  </div>
  )
};

export default Dogs1;


