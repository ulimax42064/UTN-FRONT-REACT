import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Proveedores from './pages/Proveedores';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/proveedores" element={<Proveedores />} />
        </Route>

        {/* Redirige la raíz al login o a proveedores según haya token */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/proveedores" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Cualquier otra ruta va al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
