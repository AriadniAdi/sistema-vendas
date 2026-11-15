import api from './api';

const produtoService = {
  listar: async (nome = '') => {
    const response = await api.get(`/produtos${nome ? `?nome_like=${nome}` : ''}`);
    return response.data;
  },

  criar: async (dadosProduto) => {
    const response = await api.post('/produtos', dadosProduto);
    return response.data;
  },

  atualizar: async (id, dadosProduto) => {
    const response = await api.put(`/produtos/${id}`, dadosProduto);
    return response.data;
  },

  deletar: async (id) => {
    await api.delete(`/produtos/${id}`);
  },
};

export default produtoService;