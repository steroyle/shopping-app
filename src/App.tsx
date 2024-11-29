import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MantineProvider} from '@mantine/core';
import {AuthProvider} from './contexts/AuthContext';
import {ProtectedRoute} from './components/ProtectedRoute';
import {LoginPage} from './pages/LoginPage';
import {HomePage} from './pages/HomePage';
import {ItemsPage} from './pages/ItemsPage';
import {CategoriesPage} from './pages/CategoriesPage';
import {CategoryEditPage} from './pages/CategoryEditPage';
import {ItemEditPage} from './pages/ItemEditPage';

function App() {
  return (
    <AuthProvider>
      <MantineProvider
        theme={{
          fontFamily: 'Poppins, sans-serif',
          headings: {fontFamily: 'Poppins, sans-serif', fontWeight: '600'},
        }}
      >
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
              path="/items/:itemId"
              element={
                <ProtectedRoute>
                  <ItemEditPage />
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
            <Route
              path="/categories/:categoryId"
              element={
                <ProtectedRoute>
                  <CategoryEditPage />
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
