import React from "react";
import App1 from "./App1";
import Pets from "./Pets";
import Dogs from './Dogs';
import Cats from "./Cats";
import Birds from "./Birds";
import { Routes,Route,Link} from "react-router-dom";
import Grooming from "./Grooming";
import Supplies from "./Supplies";
import App from "./App";
import App2 from "./App2";
import CreateItem from "./Createitem";
import Category from "./Category";
import Dogs1 from "./Dogs1";
import ToggleMenu from "./ToggleMenu";





function Home(){
    return(<div>
         <nav class="navv"><h1 class="Head">PET STORE MANAGEMENT</h1>
         <Link to ="/App1"><button className="link12"> Sign In</button></Link>
         <Link to ="/App"><button className="link14">Sign Up</button></Link>
         <Link to ="/"><button className="link13">Home</button></Link>
         <Link to ="/App2"><button className="link15">Admin</button></Link>
         <Link to ="/ToggleMenu"><button className="link16">Wishlist</button></Link>
    </nav>
      <h1 className="lan">WELCOME...</h1>
      <p className="lan1">SOME THINGS JUST</p>
      <p className="lan2">FILL YOUR HEART
      WITHOUT TRYING....</p>
   
    <Routes>
    <Route exact path="/App1" element={<App1/>}></Route>
    <Route exact path="/App" element={<App/>}></Route>
    
    <Route exact path="/Pets" element={<Pets/>}></Route>
    <Route exact path="/Dogs" element={<Dogs/>}></Route>
    <Route exact path="/Dogs1" element={<Dogs1/>}></Route>
    <Route exact path="/Cats" element={<Cats/>}></Route>
    <Route exact path="/Birds" element={<Birds/>}></Route>
    <Route exact path="/Grooming" element={<Grooming/>}></Route>
    <Route exact path="/Supplies" element={<Supplies/>}></Route>
    <Route exact path="/App2" element={<App2/>}></Route>
    <Route exact path="/createitem" element={<CreateItem/>}></Route>
    <Route exact path="/Category" element={<Category/>}></Route>
    <Route exact path="/ToggleMenu" element={<ToggleMenu/>}></Route>
    </Routes>

        
    </div>);
}

export default Home;