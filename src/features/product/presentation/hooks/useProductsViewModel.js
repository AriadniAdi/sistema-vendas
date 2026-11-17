import { useEffect, useState } from 'react';
import productService from '../../data/productService';
import { productMessages } from '../constants/productMessages';

export function useProductsViewModel() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const loadProducts = async (searchTermParam = '') => {
    try {
      setError('');
      setProducts(await productService.list(searchTermParam));
    } catch {
      setError(productMessages.loadError);
    }
  };

  useEffect(() => {
    // The initial load synchronizes the state with the API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, []);

  const searchProducts = (searchTermParam) => {
    setSearchTerm(searchTermParam);
    setPage(1);
    loadProducts(searchTermParam);
  };

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const saveProduct = async (productData) => {
    try {
      setError('');
      if (productData.id) await productService.update(productData.id, productData);
      else await productService.create(productData);
      closeModal();
      await loadProducts(searchTerm);
    } catch {
      setError(productMessages.saveError);
    }
  };

  const requestDeleteProduct = (product) => setProductToDelete(product);

  const cancelDeleteProduct = () => setProductToDelete(null);

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      setError('');
      await productService.delete(productToDelete.id);
      setProductToDelete(null);
      await loadProducts(searchTerm);
    } catch {
      setError(productMessages.deleteError);
    }
  };

  return {
    products, searchTerm, modalOpen, selectedProduct, productToDelete, error,
    page, setPage, itemsPerPage,
    searchProducts, openModal, closeModal, saveProduct,
    requestDeleteProduct, cancelDeleteProduct, confirmDeleteProduct,
  };
}
