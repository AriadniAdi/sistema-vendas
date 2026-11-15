import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

export default function ProdutoModal({ open, handleClose, onSave, produtoParaEditar }) {
  const [nome, setNome] = useState(produtoParaEditar ? produtoParaEditar.nome : '');
  const [valor, setValor] = useState(produtoParaEditar ? produtoParaEditar.valor : '');
  const [estoque, setEstoque] = useState(produtoParaEditar ? produtoParaEditar.estoque : '');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || valor === '' || estoque === '') {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    if (Number(valor) < 0 || Number(estoque) < 0) {
      setErro('O preço e o estoque não podem ser negativos.');
      return;
    }

    onSave({
      id: produtoParaEditar ? produtoParaEditar.id : undefined,
      nome,
      valor: Number(valor),
      estoque: Number(estoque),
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{produtoParaEditar ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {erro && <Box color="error.main" fontSize="0.875rem">{erro}</Box>}
            
            <TextField
              label="Nome do Produto"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            
            <TextField
              label="Valor Unitário (R$)"
              variant="outlined"
              type="number"
              fullWidth
              inputProps={{ min: 0, step: '0.01' }}
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
            
            <TextField
              label="Quantidade em Estoque"
              variant="outlined"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}