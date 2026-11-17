import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../src/services/api';
import authService from '../../src/services/authService';

vi.mock('../../src/services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

const storage = new Map();

globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear(),
};

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('logs in, stores the token and returns the user', async () => {
    const user = { id: '1', username: 'admin' };
    api.post.mockResolvedValue({ data: { accessToken: 'token-123', user } });

    const result = await authService.login('admin', 'password');

    expect(api.post).toHaveBeenCalledWith('/login', {
      email: 'admin@sales-management.local',
      password: 'password',
    });
    expect(localStorage.getItem('accessToken')).toBe('token-123');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(user);
    expect(result).toEqual(user);
  });

  it('returns null from getMe when no user is stored', async () => {
    await expect(authService.getMe()).resolves.toBeNull();
    expect(api.get).not.toHaveBeenCalled();
  });

  it('fetches the current user data in getMe', async () => {
    localStorage.setItem('user', JSON.stringify({ id: '1' }));
    api.get.mockResolvedValue({ data: { id: '1', username: 'admin' } });

    await expect(authService.getMe()).resolves.toEqual({
      id: '1',
      username: 'admin',
    });
    expect(api.get).toHaveBeenCalledWith('/users/1');
  });

  it('removes the token and user on logout', async () => {
    localStorage.setItem('accessToken', 'token-123');
    localStorage.setItem('user', JSON.stringify({ id: '1' }));

    await authService.logout();

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
