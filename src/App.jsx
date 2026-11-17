import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import ProdutosPage from './features/product/presentation/pages/ProdutosPage';
import LoginPage from './features/auth/presentation/pages/LoginPage';
import ProtectedRoute from './features/auth/presentation/routes/ProtectedRoute';
import { AuthProvider } from './features/auth/presentation/context/AuthContext';
import { useAuth } from './features/auth/presentation/hooks/useAuth';

function LoginRoute() {
  const { login } = useAuth();
  return <LoginPage onLogin={login} />;
}

function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistema de Vendas
          </Typography>
          <Button color="inherit" component={Link} to="/produtos">
            Produtos
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <OutletContent />
        </Box>
      </Container>
    </>
  );
}

function OutletContent() {
  return <ProdutosPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />} />
            <Route path="/produtos" element={<AppLayout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
