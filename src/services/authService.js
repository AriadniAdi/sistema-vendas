import api from './api';

const authService = {
  login: async (username, password) => {
    const response = await api.post('/login', {
      username,
      password,
    });

    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  },

  getMe: async () => {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      return null;
    }

    const user = JSON.parse(savedUser);
    const response = await api.get(`/users/${user.id}`);

    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },
};

export default authService;