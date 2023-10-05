import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";


const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        // console.log('google mama is coming');
        signInWithPopup(auth, provider)
            .then((result) => {
                const userLoggedIn = result.user;
                console.log(userLoggedIn);
                setUser(userLoggedIn);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then((result) => {
                console.log(result);
                setUser(null)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div>
            {
                user ? <button onClick={handleGoogleSignOut}>Log out</button>
                    :
                    <button onClick={handleGoogleSignIn}>Login</button>
            }
            {
                user && <div>
                    <h3>{user.displayName}</h3>
                    <p>{user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;