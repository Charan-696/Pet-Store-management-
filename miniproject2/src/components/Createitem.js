import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateItem = () => {
  const [item, setItem] = useState({
    seller_id: 2, // Initialize seller_id as null
    item_name: '',
    description: '',
    starting_price: 0, 
    image:'',
  });
  const navigate=useNavigate();
  useEffect(() => {
    // Fetch the seller_id cookie
    const sellerIdFromCookie = document.cookie.split('; ').find(row => row.startsWith('seller_id='));
    
    if (sellerIdFromCookie) {
      const sellerId = sellerIdFromCookie.split('=')[1];
      setItem((prevItem) => ({ ...prevItem, seller_id: sellerId }));
    }
  }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to the server to add the item
    fetch('/createitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item added:', data);
        navigate('/Category');
        // Clear the form
        setItem({
          ...item,
          item_name: '',
          description: '',
          starting_price: 0,
          image:'',
          category_id:'',
        });
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  return (
    
    <div className='G1'>
    <section className='Glass'>
      <h1>Create a New Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          
          <input type="text" name="item_name" placeholder="Item Name:" value={item.item_name} onChange={handleChange} />
        </label>
        <label>
          <textarea name="description" placeholder="Description:" value={item.description} onChange={handleChange} />
        </label>
        <label>
          
          <input type="number" name="starting_price" placeholder="Starting Price:" value={item.starting_price} onChange={handleChange} />
        </label>
        <label>
          <input type="url" name="image" placeholder="Image:" value={item.image} onChange={handleChange} />
        </label>
        <label>
          <input type='number' name='category_id' placeholder='category' value={item.category_id} onChange={handleChange}/>
        </label>
        <button type="submit">Create Item</button>
      </form>
      </section>
    </div>
    
  );
};

export default CreateItem;