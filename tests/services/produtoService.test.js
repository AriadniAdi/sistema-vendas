import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../src/services/api';
import produtoService from '../../src/services/produtoService';

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('produtoService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lista todos os produtos sem filtro', async () => {
    api.get.mockResolvedValue({ data: [{ id: '1', nome: 'Notebook' }] });

    await expect(produtoService.listar()).resolves.toEqual([
      { id: '1', nome: 'Notebook' },
    ]);
    expect(api.get).toHaveBeenCalledWith('/produtos');
  });

  it('lista produtos filtrando pelo nome', async () => {
    api.get.mockResolvedValue({ data: [] });

    await produtoService.listar('mouse');

    expect(api.get).toHaveBeenCalledWith('/produtos?nome_like=mouse');
  });

  it('cria e atualiza um produto', async () => {
    const produto = { nome: 'Mouse', valor: 100, estoque: 5 };
    api.post.mockResolvedValue({ data: { id: '1', ...produto } });
    api.put.mockResolvedValue({ data: { id: '1', ...produto } });

    await expect(produtoService.criar(produto)).resolves.toEqual({
      id: '1',
      ...produto,
    });
    await expect(produtoService.atualizar('1', produto)).resolves.toEqual({
      id: '1',
      ...produto,
    });
    expect(api.post).toHaveBeenCalledWith('/produtos', produto);
    expect(api.put).toHaveBeenCalledWith('/produtos/1', produto);
  });

  it('deleta um produto', async () => {
    api.delete.mockResolvedValue({});

    await expect(produtoService.deletar('1')).resolves.toBeUndefined();

    expect(api.delete).toHaveBeenCalledWith('/produtos/1');
  });
});
