import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MantineProvider} from '@mantine/core';
import {AuthProvider} from './contexts/AuthContext';
import {ProtectedRoute} from './components/ProtectedRoute';
import {LoginPage} from './pages/LoginPage';
import {HomePage} from './pages/HomePage';
import {ItemsPage} from './pages/ItemsPage';
import {CategoriesPage} from './pages/CategoriesPage';

function App() {
  return (
    <AuthProvider>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/items"
              element={
                <ProtectedRoute>
                  <ItemsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <CategoriesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;
