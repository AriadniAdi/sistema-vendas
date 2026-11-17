import { useEffect, useMemo, useState } from 'react';
import authService from '../../../../services/authService';
import { AuthContext } from './authContextValue';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!localStorage.getItem('accessToken')) {
        setLoading(false);
        return;
      }
      try {
        setUser(await authService.getMe());
      } catch {
        await authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async ({ username, password }) => {
    const loggedUser = await authService.login(username, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

