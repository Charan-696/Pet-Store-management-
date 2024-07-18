import React from 'react';
import ReactDOM from 'react-dom';
import {Routes,Route,Link} from 'react-router-dom';

function Boxx({logo,rate,path}){
    return(<div className='Box'>
      <img className="Logo" src={logo}></img>
      <Link to ={path}><button className="Ratting"><h2>{rate}</h2></button></Link>
      
    </div>)
}
const cardData = [
    { logo: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/09/how-much-does-a-cat-cost.jpeg.jpg", rate:"CATS", path:"/Cats" },
    { logo: "https://img.freepik.com/free-photo/cute-dog-sleeping-ai-generated_23-2150644023.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698624000&semt=ais", rate:"DOGS",path:"/Dogs"},
    { logo: "https://us.123rf.com/450wm/rmagfx/rmagfx2306/rmagfx230602979/207346834-a-vibrant-flock-of-tropical-birds-perched-on-branches.jpg?ver=6", rate:"BIRDS",path:"/Birds" },
    // Add more data for additional cards as needed

  ];

function Pets()
{
    return( <div className="pups">
            <header className='headerr'><h1 className='hh2'>PETS</h1></header>

            {cardData.map((Box, index) => (
          <Boxx key={index} logo={Box.logo} rate={Box.rate} path = {Box.path}/>
          
        ))}
        

    </div>);
}

export default Pets;