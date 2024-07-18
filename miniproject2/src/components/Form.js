import React from 'react';
import ReactDOM from 'react-dom';
import {Routes,Route} from 'react-router-dom';

function Form()
{
    return( <div className="outer">
    
    <form  action="/" method="POST">
            
            <input type="email" name="email" placeholder="Email" required/><br/>
            <input type="password" name="password" placeholder="Password"required/><br/>
            
            <button type="submit">Signup</button>
            
    </form>
    
</div>);
}

export default Form;