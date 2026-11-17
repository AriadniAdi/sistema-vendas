import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useLoginViewModel } from '../hooks/useLoginViewModel';

function LoginPage({ onLogin }) {
  const { username, setUsername, password, setPassword, error, loading, handleSubmit } =
    useLoginViewModel(onLogin);

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%', maxWidth: 420, p: 4, mx: 'auto' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Sistema de Vendas
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Entre com suas credenciais para continuar.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField label="Usuário" value={username} onChange={(event) => setUsername(event.target.value)} margin="normal" fullWidth required autoComplete="username" autoFocus />
            <TextField label="Senha" type="password" value={password} onChange={(event) => setPassword(event.target.value)} margin="normal" fullWidth required autoComplete="current-password" />
            <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ mt: 3 }}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;
