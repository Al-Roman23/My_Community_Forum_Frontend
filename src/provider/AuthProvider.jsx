import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";
import { AuthContext } from "./AuthContext.jsx";

const AuthProvider = ({ children }) => {
  // ===== State Management =====
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== Auth Functions =====
  // Create a new user with email & password!
  const createUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ===== Sign In with Email & Password =====
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google provider!
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out the current user!
  const logOut = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user's display name & photo!
  const updateUserProfile = async (displayName, photoURL) => {
    setError(null);
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser({ ...auth.currentUser });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // ===== Side Effects =====
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount!
    return () => unsubscribe();
  }, []);

  // ===== Provide Auth State and Functions to the App =====
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        setUser,
        setLoading,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
