import { auth, db } from '../config/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [user, setUser] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        return auth.onAuthStateChanged(newUser => { // Update user to newUser
            setUser(newUser);
        });
    }, []);

    const handleButtonClick = async () => {
        if (isSignUp) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);

                await updateProfile(auth.currentUser, {
                    displayName: displayName
                })

                await setDoc(doc(db, "Users", auth.currentUser.uid), {
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email,
                    displayName: auth.currentUser.displayName
                })

                console.log("Document written with ID: ", auth.currentUser.uid);
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const toggleSignUpMode = () => {
        setIsSignUp(!isSignUp);
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    const goToUserProfile = () => {
        window.location.href = "/user"; // replace with actual URL
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                    <button onClick={goToUserProfile}>My Profile</button>
                    <button onClick={logOut}>Log Out</button>
                </div>
            ) : (
                <div>
                    <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
                    {isSignUp && (
                        <input placeholder="DisplayName (If new user)..." onChange={(e) => setDisplayName(e.target.value)} />
                    )}
                    <button onClick={handleButtonClick}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                    <button onClick={toggleSignUpMode}>
                        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                    </button>
                </div>
            )}
        </div>
    );
};