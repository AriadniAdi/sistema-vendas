import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../src/services/api';
import productService from '../../src/features/product/data/productService';

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('productService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lists all products without a filter', async () => {
    api.get.mockResolvedValue({ data: [{ id: '1', name: 'Notebook' }] });

    await expect(productService.list()).resolves.toEqual([
      { id: '1', name: 'Notebook' },
    ]);
    expect(api.get).toHaveBeenCalledWith('/products');
  });

  it('lists products filtered by name', async () => {
    api.get.mockResolvedValue({ data: [] });

    await productService.list('mouse');

    expect(api.get).toHaveBeenCalledWith('/products?name_like=mouse');
  });

  it('creates and updates a product', async () => {
    const product = { name: 'Mouse', price: 100, stock: 5 };
    api.post.mockResolvedValue({ data: { id: '1', ...product } });
    api.put.mockResolvedValue({ data: { id: '1', ...product } });

    await expect(productService.create(product)).resolves.toEqual({
      id: '1',
      ...product,
    });
    await expect(productService.update('1', product)).resolves.toEqual({
      id: '1',
      ...product,
    });
    expect(api.post).toHaveBeenCalledWith('/products', product);
    expect(api.put).toHaveBeenCalledWith('/products/1', product);
  });

  it('deletes a product', async () => {
    api.delete.mockResolvedValue({});

    await expect(productService.delete('1')).resolves.toBeUndefined();

    expect(api.delete).toHaveBeenCalledWith('/products/1');
  });
});
