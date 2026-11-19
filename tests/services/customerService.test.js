import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../src/services/api';
import customerService from '../../src/features/customer/data/customerService';

vi.mock('../../src/services/api', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

describe('customerService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lists customers and supports name search', async () => {
    api.get.mockResolvedValue({ data: [{ id: '1', name: 'Ana', cpf: '123' }] });

    await expect(customerService.list()).resolves.toEqual([{ id: '1', name: 'Ana', cpf: '123' }]);
    await customerService.list('Ana');

    expect(api.get).toHaveBeenNthCalledWith(1, '/customers');
    expect(api.get).toHaveBeenNthCalledWith(2, '/customers?name_like=Ana');
  });

  it('creates and updates a customer', async () => {
    const customer = { name: 'Ana', cpf: '123' };
    api.post.mockResolvedValue({ data: { id: '1', ...customer } });
    api.put.mockResolvedValue({ data: { id: '1', ...customer } });

    await expect(customerService.create(customer)).resolves.toEqual({ id: '1', ...customer });
    await expect(customerService.update('1', customer)).resolves.toEqual({ id: '1', ...customer });
    expect(api.post).toHaveBeenCalledWith('/customers', customer);
    expect(api.put).toHaveBeenCalledWith('/customers/1', customer);
  });

  it('deletes a customer', async () => {
    await customerService.delete('1');
    expect(api.delete).toHaveBeenCalledWith('/customers/1');
  });
});
