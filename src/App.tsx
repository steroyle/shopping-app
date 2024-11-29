import {MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRoute';
import {AuthProvider} from './contexts/AuthContext';
import {CategoriesPage} from './pages/CategoriesPage';
import {CategoryEditPage} from './pages/CategoryEditPage';
import {HomePage} from './pages/HomePage';
import {ItemEditPage} from './pages/ItemEditPage';
import {ItemsPage} from './pages/ItemsPage';
import {LoginPage} from './pages/LoginPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
