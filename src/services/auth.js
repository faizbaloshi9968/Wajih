import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Mock credentials for development
export const mockCredentials = {
  player: { email: 'player@tourneyhub.com', password: 'player123' },
  manager: { email: 'manager@tourneyhub.com', password: 'manager123' },
  admin: { email: 'admin@tourneyhub.com', password: 'admin123' }
};

export const authenticateUser = async (email, password) => {
  // First check if using mock credentials
  const mockUser = Object.values(mockCredentials).find(
    cred => cred.email === email && cred.password === password
  );

  if (mockUser) {
    // For mock credentials, create a custom auth state
    const userRole = email === mockCredentials.admin.email ? 'admin' 
                  : email === mockCredentials.manager.email ? 'manager'
                  : 'player';

    const userData = {
      email: email,
      role: userRole,
      isAuthenticated: true,
      uid: `mock_${userRole}_${Date.now()}` // Generate a mock UID
    };
    
    return { user: userData };
  }

  // If not mock credentials, try Firebase authentication
  try {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password. Please try the mock credentials:\n' +
        'Player: player@tourneyhub.com / player123\n' +
        'Manager: manager@tourneyhub.com / manager123\n' +
        'Admin: admin@tourneyhub.com / admin123');
    }
    throw error;
  }
};

export const registerUser = async (email, password, role = 'player') => {
  try {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData = {
      email: email,
      role: role,
      isAuthenticated: true,
      uid: result.user.uid
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    return { user: userData };
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please try logging in instead.');
    }
    throw error;
  }
};
