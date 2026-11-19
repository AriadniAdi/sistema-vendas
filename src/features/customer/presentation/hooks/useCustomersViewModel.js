import { useEffect, useState } from 'react';
import customerService from '../../data/customerService';
import { customerMessages } from '../constants/customerMessages';

export function useCustomersViewModel() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  const loadCustomers = async (term = '') => {
    try { setError(''); setCustomers(await customerService.list(term)); }
    catch { setError(customerMessages.loadError); }
  };

  useEffect(() => {
    // The initial load synchronizes the state with the API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCustomers();
  }, []);

  const searchCustomers = (term) => { setSearchTerm(term); loadCustomers(term); };
  const openModal = (customer = null) => { setSelectedCustomer(customer); setModalOpen(true); };
  const closeModal = () => { setSelectedCustomer(null); setModalOpen(false); };
  const saveCustomer = async (data) => {
    try {
      setError('');
      if (data.id) await customerService.update(data.id, data);
      else await customerService.create(data);
      closeModal(); await loadCustomers(searchTerm);
    } catch { setError(customerMessages.saveError); }
  };
  const confirmDeleteCustomer = async () => {
    if (!customerToDelete) return;
    try {
      setError(''); await customerService.delete(customerToDelete.id);
      setCustomerToDelete(null); await loadCustomers(searchTerm);
    } catch { setError(customerMessages.deleteError); }
  };

  return {
    customers, searchTerm, selectedCustomer, customerToDelete, modalOpen, error,
    searchCustomers, openModal, closeModal, saveCustomer,
    requestDeleteCustomer: setCustomerToDelete,
    cancelDeleteCustomer: () => setCustomerToDelete(null), confirmDeleteCustomer,
  };
}
