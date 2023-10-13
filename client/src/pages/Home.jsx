import Auth from '../utils/auth';
import { useNavigate} from "react-router-dom";
function Home() {
    const navigate= useNavigate ();
    return (
        <main>
            <h1>Best Code Bot Ever</h1>
            <h2>SIMPLIFY YOUR CODING JOURNEY</h2>
             <button onClick= {()=> {
                navigate('/register')
             }}>Sign Up</button>
           <button onClick= {() => {
                navigate('/login')
           }}>Log In</button>
            {/* The Log Out button was placed here for now so the team can log in and out of the app for testing. In the future it will conditionally render only when a user is logged in. */}
             <button onClick= {Auth.logout} >Log Out</button> 
        </main>
    );
}

export default Home;