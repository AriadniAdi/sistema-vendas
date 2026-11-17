import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { appMessages } from '../constants/appMessages';

export default function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#123b56' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {appMessages.appName}
          </Typography>
          <Button color="inherit" component={Link} to="/">
            {appMessages.home}
          </Button>
          <Button color="inherit" component={Link} to="/products">
            {appMessages.products}
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            {appMessages.logout}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: 'calc(100vh - 64px)', py: 4 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
