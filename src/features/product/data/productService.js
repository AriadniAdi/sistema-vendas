import api from '../../../services/api';

const productService = {
  list: async (name = '') => {
    const response = await api.get(`/products${name ? `?name_like=${name}` : ''}`);
    return response.data;
  },

  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/products/${id}`);
  },
};

export default productService;
