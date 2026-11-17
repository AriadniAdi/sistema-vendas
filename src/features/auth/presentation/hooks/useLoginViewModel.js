import { useState } from 'react';

export function useLoginViewModel(onLogin) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Informe o usuário e a senha para continuar.');
      return;
    }

    if (!onLogin) {
      setError('A função de login ainda não foi configurada.');
      return;
    }

    try {
      setLoading(true);
      await onLogin({ username, password });
    } catch (loginError) {
      setError(loginError.message || 'Não foi possível realizar o login.');
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
