import { useState } from 'react';
import { authMessages } from '../constants/authMessages';

export function useLoginViewModel(onLogin) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError(authMessages.credentialsRequired);
      return;
    }

    if (!onLogin) {
      setError(authMessages.loginNotConfigured);
      return;
    }

    try {
      setLoading(true);
      await onLogin({ username, password });
    } catch (loginError) {
      setError(loginError.message || authMessages.loginError);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
}
