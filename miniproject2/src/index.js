import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./components/Home"
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Home/>
    </BrowserRouter>
  </React.StrictMode>
);

