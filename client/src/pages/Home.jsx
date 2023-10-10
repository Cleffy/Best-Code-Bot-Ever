import Auth from '../utils/auth';

function Home() {
    return (
        <main>
            <h1>Best Code Bot Ever</h1>
            <h2>SIMPLIFY YOUR CODING JOURNEY</h2>
            <a href="/register"><button>Register</button></a>
            <a href="/login"><button>Log In</button></a>
            {/* The Log Out button was placed here for now so the team can log in and out of the app for testing. In the future it will conditionally render only when a user is logged in. */}
             <button onClick={Auth.logout} >Log Out</button> 
        </main>
    );
}

export default Home;