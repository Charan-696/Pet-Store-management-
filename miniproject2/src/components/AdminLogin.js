import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
const navigate=useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the server for seller login
    fetch('/adminlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.msg);
        // Handle the response from the server (e.g., check for success or error)
        if(data.msg=="sucess"){
        navigate('/createitem');}
        else{
          var theDiv = document.getElementById("incorrect");
          var content = document.createTextNode("password or username incorrect");
          theDiv.appendChild(content);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className='outer'>
      <form onSubmit={handleSubmit}>
        <label>
         
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        </label>
        <label>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        </label>
        <button type="submit">Sign In</button>
        <div id='incorrect'></div>
      </form>
    </div>
  );
};

export default AdminLogin;