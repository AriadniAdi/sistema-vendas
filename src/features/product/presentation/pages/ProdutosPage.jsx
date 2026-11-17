import {
  Alert, Box, Button, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import ProdutoModal from '../components/ProdutoModal';
import { useProdutosViewModel } from '../hooks/useProdutosViewModel';

export default function ProdutosPage() {
  const {
    produtos, busca, modalOpen, produtoSelecionado, error,
    pesquisar, abrirModal, fecharModal, salvarProduto, deletarProduto,
  } = useProdutosViewModel();

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">Gerenciamento de Produtos</Typography>
      <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
        <TextField
          label="Pesquisar por nome"
          variant="outlined"
          size="small"
          value={busca}
          onChange={(event) => pesquisar(event.target.value)}
          InputProps={{ endAdornment: <SearchIcon color="action" /> }}
          sx={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirModal()}>
          Novo Produto
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><b>Nome</b></TableCell>
              <TableCell align="right"><b>Valor Unitário (R$)</b></TableCell>
              <TableCell align="right"><b>Estoque</b></TableCell>
              <TableCell align="center"><b>Ações</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.length > 0 ? produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell align="right">
                  {Number(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell align="right">{produto.estoque}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => abrirModal(produto)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => deletarProduto(produto.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={4} align="center">Nenhum produto encontrado.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ProdutoModal
        open={modalOpen}
        handleClose={fecharModal}
        onSave={salvarProduto}
        produtoParaEditar={produtoSelecionado}
      />
    </Box>
  );
}
