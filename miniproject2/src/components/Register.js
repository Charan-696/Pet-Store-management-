import { Link } from 'react-router-dom';


function Register() {
    return (
        <div>
                    <div className="outer">
                        <form className='inner2' method="POST" name="signin" action='/register'>
                            <centre><h1>Sign up</h1></centre>
                            
                            <input type="email" name="email" placeholder="Email"/><br/>
                    
                            <input type="password" name="password" placeholder="Password"/>
                            
                            <input type="password" name="cpassword" placeholder="Confirm Password"/>
                            <input type="text" name="username" placeholder="username"/>
                           
                            <input type="text" name="phone" placeholder="Mobile Number"></input>
                            <button type="submit" class="btn">Sign up</button>
                            
                        </form>
                    </div>
                </div> 

    )
}

export default Register;