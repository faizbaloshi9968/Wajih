import React, { useEffect } from "react";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Get stored user data and merge with Firebase user
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userData = {
          ...storedUser,
          uid: user.uid,
          email: user.email,
          isAuthenticated: true
        };
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
