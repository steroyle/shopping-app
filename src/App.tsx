import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MantineProvider} from '@mantine/core';
import {AuthProvider} from './contexts/AuthContext';
import {LoginPage} from './pages/LoginPage';
import {HomePage} from './pages/HomePage';
import {ProtectedRoute} from './components/ProtectedRoute';

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
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;
