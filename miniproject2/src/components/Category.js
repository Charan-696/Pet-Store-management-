import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  // Assuming there are at least four categories in the response
  const category1 = categories[0] || {};
  const category2 = categories[1] || {};
  const category3 = categories[2] || {};
  const category4 = categories[3] || {};

  return (
    <div className='G1'>
      <div>
        {/* Category 1 */}
        <div
          key={category1.id}
          className='Box11'
        > <img className="Logo" src={category1.image}></img>
            <Link to="/Dogs1"><button className='Ratting' type='submit'>
            <h2>{category1.category_name}</h2>
            </button></Link>
        </div>

        {/* Category 2 */}
        <div
          key={category2.id}
          className='Box11'
        >
          <img className="Logo" src={category2.image}></img>
            <Link to="/Cats"><button className='Ratting' type='submit'>
            <h2>{category2.category_name}</h2>
            </button></Link>
          
        </div>

        {/* Category 3 */}
        <div
          key={category3.id}
          className='Box11'
        >
          <img className="Logo" src={category3.image}></img>
            <Link to="/Birds"><button className='Ratting' type='submit'>
            <h2>{category3.category_name}</h2>
            </button></Link>
          
        </div>

        {/* Category 4 */}
        <div
          key={category4.id}
          className='Box11'
          
        >
            <img className="Logo" src={category4.image}></img>     
            <Link to="/Supplies"><button className='Ratting' type='submit'>
            <h2>{category4.category_name}</h2>
            </button></Link>

        </div>
      </div>
    </div>
  );
};

export default Category;