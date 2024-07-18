import React from 'react';
import ReactDOM from 'react-dom';
import {Routes,Route,Link} from 'react-router-dom';

function Boxx({logo,rate,path}){
    return(<div className='Box1'>
      <img className="Logo" src={logo}></img>
      <div className="infoo">
      <h2 className='gg'>{rate}</h2>
      <p>1000 people anger issues in one single package.</p>
        <p> Price:$1000</p>
        <button className="Ratting1"><h2 className='nothing'>Confirm</h2></button>
      </div>
      
    </div>)
}
const cardData = [
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "./shiba1.webp", rate:"shiba inu"},
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "./shiba1.webp", rate:"shiba inu"},
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "./shiba1.webp", rate:"shiba inu"},
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },
    { logo: "https://post.bark.co/wp-content/uploads/2019/06/chihuahua.png", rate:"chihuahua"  },

    // Add more data for additional cards as needed

  ];

function Grooming()
{
    return( <div className="pups">
            <header className='headerr'><h1 className='hh1'>GROOMING</h1></header>

            {cardData.map((Box, index) => (
          <Boxx key={index} logo={Box.logo} rate={Box.rate} />
          
          ))}

    </div>);
}

export default Grooming;