import api from '../../../services/api';

const customerService = {
  list: async (searchTerm = '') => (await api.get(`/customers${searchTerm ? `?name_like=${searchTerm}` : ''}`)).data,
  create: async (customerData) => (await api.post('/customers', customerData)).data,
  update: async (id, customerData) => (await api.put(`/customers/${id}`, customerData)).data,
  delete: async (id) => { await api.delete(`/customers/${id}`); },
};

export default customerService;
