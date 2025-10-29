/**
 * @fileOverview Authentication context and hooks for mobile app
 * Provides authentication state management and secure token handling
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import * as SecureStorage from '@/lib/secure-storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Store user ID and token securely when user signs in
        try {
          const token = await firebaseUser.getIdToken();
          await SecureStorage.saveAuthToken(token);
          await SecureStorage.saveUserId(firebaseUser.uid);
        } catch (error) {
          console.error('Failed to save auth data:', error);
        }
      } else {
        // Clear secure storage when user signs out
        await SecureStorage.clearAuthData();
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const auth = getAuth(app);
      await firebaseSignOut(auth);
      await SecureStorage.clearAuthData();
    } catch (error) {
      console.error('Failed to sign out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signOut,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook that requires authentication
 * Throws error if user is not authenticated
 */
export function useRequireAuth(): AuthContextType {
  const auth = useAuth();
  
  if (!auth.isAuthenticated && !auth.loading) {
    throw new Error('Authentication required');
  }
  
  return auth;
}
