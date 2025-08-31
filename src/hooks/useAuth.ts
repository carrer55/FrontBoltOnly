import { useState, useEffect } from 'react';
import { auth, type User, type AuthState } from '../lib/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(auth.getAuthState());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.subscribe((newState) => {
      setAuthState(newState);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await auth.login(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    company: string;
    position: string;
    phone: string;
  }) => {
    setLoading(true);
    try {
      const result = await auth.register(userData);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    auth.logout();
  };

  const updateProfile = async (updates: Partial<User>) => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // ユーザープロフィールも更新
      const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const updatedProfile = {
        ...currentProfile,
        full_name: updates.name || currentProfile.full_name,
        company: updates.company || currentProfile.company,
        position: updates.position || currentProfile.position,
        phone: updates.phone || currentProfile.phone
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      return { success: true, data: updatedUser };
    }
    return { success: false, error: 'ユーザーが見つかりません' };
  };

  return {
    user: authState.user,
    profile: authState.user, // ローカル実装では同じオブジェクト
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: authState.isAuthenticated,
    isOnboardingComplete: true // ローカル実装では常にtrue
  };
}