import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import ProdutosList from "./pages/ProdutosList";

export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Sistema de Vendas
          </Typography>
          <Button color="inherit" component={Link} to="/produtos">
            Produtos
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box mt={4}>
          <Routes>
            <Route path="/" element={<ProdutosList />} />

            <Route path="/produtos" element={<ProdutosList />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}
