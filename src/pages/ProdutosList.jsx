import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import produtoService from '../services/produtoService';
import ProdutoModal from './ProdutoModal';

export default function ProdutosList() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const carregarProdutos = async (termo = '') => {
    try {
      const dados = await produtoService.listar(termo);
      setProdutos(dados);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarProdutos();
  }, []);

  const handleBuscaChange = (e) => {
    const termo = e.target.value;
    setBusca(termo);
    carregarProdutos(termo);
  };

  const handleSaveProduto = async (produtoData) => {
    try {
      if (produtoData.id) {
        await produtoService.atualizar(produtoData.id, produtoData);
      } else {
        await produtoService.criar(produtoData);
      }
      carregarProdutos(busca);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      try {
        await produtoService.deletar(id);
        carregarProdutos(busca);
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    }
  };

  const handleOpenModal = (produto = null) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Gerenciamento de Produtos
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
        <TextField
          label="Pesquisar por nome"
          variant="outlined"
          size="small"
          value={busca}
          onChange={handleBuscaChange}
          InputProps={{
            endAdornment: <SearchIcon color="action" />,
          }}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal(null)}
        >
          Novo Produto
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><b>Nome</b></TableCell>
              <TableCell align="right"><b>Valor Unitário (R$)</b></TableCell>
              <TableCell align="right"><b>Estoque</b></TableCell>
              <TableCell align="center"><b>Ações</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell align="right">
                    {Number(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell align="right">{produto.estoque}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpenModal(produto)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(produto.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhum produto encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ProdutoModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSave={handleSaveProduto}
        produtoParaEditar={produtoSelecionado}
      />
    </Box>
  );
}
