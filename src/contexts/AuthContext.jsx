import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { ROLES, PUBLIC_ROLES } from '../utils/roles';

  // TODO: Add your Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyAi5TD8NsQLkgOsS6Jdo8bZAy11_wz8YRg",
  authDomain: "wajh-dbb4c.firebaseapp.com",
  projectId: "wajh-dbb4c",
  storageBucket: "wajh-dbb4c.appspot.com",
  messagingSenderId: "683697123162",
  appId: "1:683697123162:web:cef5993fda1e9bf9860d63",
  measurementId: "G-9ED4H55V25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const discordProvider = new OAuthProvider('discord.com');
discordProvider.addScope('identify email');

// Initialize Analytics only in production and when available
let analytics = null;
try {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.warn('Analytics failed to initialize:', error);
}

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    currentUser: null,
    loading: true,
    error: null,
    users: JSON.parse(localStorage.getItem('allUsers')) || [] // For admin dashboard
  });

  useEffect(() => {
    let isInitialized = false;
    
    // Set up Firebase auth state listener first
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // Get user data from localStorage to merge with Firebase user
          const localUser = JSON.parse(localStorage.getItem('user') || '{}');
          const mergedUser = {
            ...localUser,
            uid: user.uid,
            email: user.email,
            isAuthenticated: true,
            // Ensure role is preserved from localStorage or set default
            role: localUser.role || ROLES.PLAYER,
            username: localUser.username || user.email?.split('@')[0] || 'User',
            createdAt: localUser.createdAt || new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          };
          
          localStorage.setItem('user', JSON.stringify(mergedUser));
          setState(prev => ({ ...prev, currentUser: mergedUser, loading: false }));

          // Update users list for admin dashboard
          updateUsersList(mergedUser);
        } else {
          // Only clear if we're not in the middle of initialization
          if (isInitialized) {
            localStorage.removeItem('user');
            setState(prev => ({ ...prev, currentUser: null, loading: false }));
          } else {
            // On initial load, check localStorage first
            const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
            if (storedUser && storedUser.isAuthenticated) {
              setState(prev => ({ ...prev, currentUser: storedUser, loading: false }));
            } else {
              setState(prev => ({ ...prev, currentUser: null, loading: false }));
            }
          }
        }
        isInitialized = true;
      },
      (error) => {
        console.error('Auth state change error:', error);
        setState(prev => ({ ...prev, error, loading: false }));
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Helper function to update users list for admin dashboard
  const updateUsersList = (user) => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const existingUserIndex = allUsers.findIndex(u => u.uid === user.uid);
    
    if (existingUserIndex >= 0) {
      allUsers[existingUserIndex] = { ...allUsers[existingUserIndex], ...user };
    } else {
      allUsers.push(user);
    }
    
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    setState(prev => ({ ...prev, users: allUsers }));
  };

  // Function to get all users (for admin dashboard)
  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('allUsers') || '[]');
  };

  // Function to upload profile image to Firebase Storage
  const uploadProfileImage = async (file) => {
    if (!state.currentUser) {
      throw new Error('No user logged in');
    }

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileName = `profile-images/${state.currentUser.uid}/${timestamp}-${file.name}`;
      const storageRef = ref(storage, fileName);

      // Upload file to Firebase Storage
      console.log('📤 Uploading image to Firebase Storage...');
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log('🎉 Image uploaded successfully to Firebase Storage!');
      return downloadURL;
    } catch (error) {
      console.error('❌ Failed to upload image:', error);
      throw error;
    }
  };

  // Function to load user profile data from Firestore database
  const loadUserFromDatabase = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Convert Firestore timestamp to ISO string for consistency
        if (userData.updatedAt && userData.updatedAt.toDate) {
          userData.updatedAt = userData.updatedAt.toDate().toISOString();
        }
        console.log('📥 User profile loaded from DATABASE successfully!');
        return userData;
      }
      return null;
    } catch (error) {
      console.error('❌ Failed to load user profile from database:', error);
      return null;
    }
  };

  // Function to update user profile data (saves to Firestore database)
  const updateUser = async (updatedData) => {
    if (!state.currentUser) {
      console.error('No current user to update');
      return false;
    }

    try {
      // Merge updated data with current user data
      const updatedUser = {
        ...state.currentUser,
        ...updatedData,
        updatedAt: serverTimestamp()
      };

      // Save to Firestore database (REAL DATABASE!)
      const userDocRef = doc(db, 'users', state.currentUser.uid);
      await setDoc(userDocRef, updatedUser, { merge: true });

      // Update localStorage for immediate UI updates
      const userForStorage = {
        ...updatedUser,
        updatedAt: new Date().toISOString() // Convert timestamp for localStorage
      };
      localStorage.setItem('user', JSON.stringify(userForStorage));

      // Update current user state
      setState(prev => ({ ...prev, currentUser: userForStorage }));

      // Update in users list for admin dashboard
      updateUsersList(userForStorage);

      console.log('🚀 User profile saved to REAL DATABASE successfully!');
      return true;
    } catch (error) {
      console.error('❌ Failed to save user profile to database:', error);
      return false;
    }
  };

  // Function to update user role (admin only)
  const updateUserRole = (userId, newRole) => {
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const userIndex = allUsers.findIndex(u => u.uid === userId);
    
    if (userIndex >= 0) {
      allUsers[userIndex].role = newRole;
      allUsers[userIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      setState(prev => ({ ...prev, users: allUsers }));
      
      // If updating current user, update their session too
      if (state.currentUser && state.currentUser.uid === userId) {
        const updatedCurrentUser = { ...state.currentUser, role: newRole };
        localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
        setState(prev => ({ ...prev, currentUser: updatedCurrentUser }));
      }
      
      return true;
    }
    return false;
  };

  // Debug function to make current user super admin (for development)
  const makeMeSuperAdmin = () => {
    if (state.currentUser) {
      const updatedUser = { ...state.currentUser, role: ROLES.SUPER_ADMIN };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setState(prev => ({ ...prev, currentUser: updatedUser }));
      
      // Update in users list too
      updateUsersList(updatedUser);
      
      console.log('🚀 You are now a Super Admin!');
      return true;
    }
    console.log('❌ No user logged in');
    return false;
  };

  // Expose makeMeSuperAdmin globally for development
  if (typeof window !== 'undefined') {
    window.makeMeSuperAdmin = makeMeSuperAdmin;
  }

  const signup = async (email, password, userData = {}) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Validate role - only allow public roles during registration
      const requestedRole = userData.role || ROLES.PLAYER;
      const finalRole = PUBLIC_ROLES.includes(requestedRole) ? requestedRole : ROLES.PLAYER;
      
      // Create user data with validated role
      const newUserData = {
        uid: result.user.uid,
        email: result.user.email,
        role: finalRole,
        username: userData.username || email.split('@')[0],
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        status: 'active',
        ...userData
      };
      
      // Save new user to Firestore database (REAL DATABASE!)
      const userDocRef = doc(db, 'users', result.user.uid);
      await setDoc(userDocRef, {
        ...newUserData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('🎉 New user saved to DATABASE successfully!');
      
      // Store user data in localStorage for immediate access
      localStorage.setItem('user', JSON.stringify(newUserData));
      
      // Add to users list for admin dashboard
      updateUsersList(newUserData);
      
      // Update state immediately
      setState(prev => ({ ...prev, currentUser: newUserData, loading: false }));
      return { user: newUserData };
    } catch (error) {
      setState(prev => ({ ...prev, error }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const login = async (email, password) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Try to load user data from Firestore database first
      let userData = await loadUserFromDatabase(result.user.uid);
      
      if (!userData) {
        // If no data in database, check localStorage or create default
        let localData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!localData.uid || localData.uid !== result.user.uid) {
          userData = {
            uid: result.user.uid,
            email: result.user.email,
            role: ROLES.PLAYER, // Default role for new users
            username: result.user.email.split('@')[0],
            isAuthenticated: true,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            status: 'active'
          };
        } else {
          userData = {
            ...localData,
            isAuthenticated: true,
            email: result.user.email,
            role: localData.role || ROLES.PLAYER,
            lastLoginAt: new Date().toISOString()
          };
        }
        
        // Save new/updated user data to database
        const userDocRef = doc(db, 'users', result.user.uid);
        await setDoc(userDocRef, {
          ...userData,
          updatedAt: serverTimestamp()
        }, { merge: true });
        
        console.log('💾 User data saved to DATABASE on login');
      } else {
        // Update login timestamp in database
        userData.lastLoginAt = new Date().toISOString();
        userData.isAuthenticated = true;
        
        const userDocRef = doc(db, 'users', result.user.uid);
        await updateDoc(userDocRef, {
          lastLoginAt: serverTimestamp(),
          isAuthenticated: true
        });
        
        console.log('🔄 User login timestamp updated in DATABASE');
      }
      
      // Store user data in localStorage for immediate access
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update users list for admin dashboard
      updateUsersList(userData);
      
      // Update state immediately
      setState(prev => ({ ...prev, currentUser: userData, loading: false }));
      return { user: userData };
    } catch (error) {
      setState(prev => ({ ...prev, error }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const loginWithGoogle = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      setState(prev => ({ ...prev, error }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await signOut(auth);
    } catch (error) {
      setState(prev => ({ ...prev, error }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const loginWithDiscord = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await signInWithPopup(auth, discordProvider);
      
      // Get the user's Discord information
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      
      // Get additional user info from Discord
      const userInfo = await fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }).then(res => res.json());
      
      // Merge Discord user info with Firebase user
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        username: userInfo.username,
        role: 'player', // Default role for Discord users
        isAuthenticated: true,
        discordId: userInfo.id,
        avatar: userInfo.avatar ? `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png` : null
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      return { user: userData };
    } catch (error) {
      setState(prev => ({ ...prev, error }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const value = {
    currentUser: state.currentUser,
    loading: state.loading,
    error: state.error,
    users: state.users,
    login,
    signup,
    logout,
    loginWithGoogle,
    loginWithDiscord,
    getAllUsers,
    updateUser,
    updateUserRole,
    uploadProfileImage,
    makeMeSuperAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {state.loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
