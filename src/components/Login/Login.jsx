import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.init'


const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // google signin 
    const handleGoogleSingIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('Error', error.message);
            })
    }

    // github signin 
    const handleGithubSingIn=() => {
        signInWithPopup(auth,githubProvider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => {
            console.log('Error', error.message);
        });

    }


// google signout 
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log('SignOut', result)
                setUser(null);
            })
            .catch(error => {
                console.log('Error', error.message);
            })
    }
    return (
        <div>

            {user ?
                <button onClick={handleSignOut}>Sign Out</button> :
                <>
                    <button onClick={handleGoogleSingIn}>Google login</button>
                    <button onClick={handleGithubSingIn} >Github Login</button>
                </>
            }

            {user && <div>
                <h3>User:{user?.displayName}</h3>
                <h3>Email:{user?.email}</h3>
                <img src={user?.photoURL} alt="" />
            </div>}

        </div>
    );
};
export default Login;