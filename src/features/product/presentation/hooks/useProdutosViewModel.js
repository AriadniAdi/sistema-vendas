import { useEffect, useState } from 'react';
import produtoService from '../../data/produtoService';

export function useProdutosViewModel() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [error, setError] = useState('');

  const carregarProdutos = async (termo = '') => {
    try {
      setError('');
      setProdutos(await produtoService.listar(termo));
    } catch {
      setError('Não foi possível carregar os produtos.');
    }
  };

  useEffect(() => {
    // O carregamento inicial sincroniza o estado com a API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarProdutos();
  }, []);

  const pesquisar = (termo) => {
    setBusca(termo);
    carregarProdutos(termo);
  };

  const abrirModal = (produto = null) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setProdutoSelecionado(null);
    setModalOpen(false);
  };

  const salvarProduto = async (dadosProduto) => {
    try {
      setError('');
      if (dadosProduto.id) await produtoService.atualizar(dadosProduto.id, dadosProduto);
      else await produtoService.criar(dadosProduto);
      fecharModal();
      await carregarProdutos(busca);
    } catch {
      setError('Não foi possível salvar o produto.');
    }
  };

  const deletarProduto = async (id) => {
    if (!window.confirm('Deseja realmente excluir este produto?')) return;
    try {
      setError('');
      await produtoService.deletar(id);
      await carregarProdutos(busca);
    } catch {
      setError('Não foi possível excluir o produto.');
    }
  };

  return {
    produtos, busca, modalOpen, produtoSelecionado, error,
    pesquisar, abrirModal, fecharModal, salvarProduto, deletarProduto,
  };
}
