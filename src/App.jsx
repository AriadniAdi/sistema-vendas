import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './features/auth/presentation/pages/LoginPage';
import { AuthProvider } from './features/auth/presentation/context/AuthContext';
import { useAuth } from './features/auth/presentation/hooks/useAuth';
import ProtectedRoute from './features/auth/presentation/routes/ProtectedRoute';
import HomePage from './features/home/presentation/HomePage';
import ProductsPage from './features/product/presentation/pages/ProductsPage';
import CustomersPage from './features/customer/presentation/pages/CustomersPage';
import AppLayout from './features/shared/presentation/components/AppLayout';

function LoginRoute() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate('/', { replace: true });
  };

  return <LoginPage onLogin={handleLogin} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="customers" element={<CustomersPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
