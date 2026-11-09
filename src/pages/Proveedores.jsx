import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  obtenerProveedores,
  crearProveedor,
  actualizarCalificacion,
} from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';

const Proveedores = () => {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [form, setForm] = useState({
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    ciudad: '',
  });
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      setCargando(true);
      const data = await obtenerProveedores();
      setLista(data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Error al cargar proveedores. ¿Está corriendo el backend?');
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        razonSocial: form.razonSocial,
        cuit: form.cuit,
        contacto: {
          email: form.email,
          telefono: form.telefono || undefined,
        },
        direccion: {
          calle: form.calle || undefined,
          ciudad: form.ciudad || undefined,
        },
      };

      const nuevo = await crearProveedor(payload);
      setLista([...lista, nuevo]);
      setForm({
        razonSocial: '',
        cuit: '',
        email: '',
        telefono: '',
        calle: '',
        ciudad: '',
      });
    } catch (error) {
      const msg =
        error.response?.data?.mensaje ||
        error.response?.data?.detalle ||
        'Error al crear proveedor';
      alert(msg);
    }
  };

  const handleCalificar = async (id, calificacion) => {
    try {
      const actualizado = await actualizarCalificacion(id, calificacion);
      setLista(lista.map((p) => (p._id === id ? actualizado : p)));
    } catch (error) {
      alert('Error al actualizar calificación');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Gestión de Proveedores</h1>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="row">
        {/* Formulario */}
        <div className="col-md-4 mb-4">
          <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <h5>Nuevo Proveedor</h5>

            <input
              type="text"
              name="razonSocial"
              className="form-control mb-2"
              placeholder="Razón Social *"
              value={form.razonSocial}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cuit"
              className="form-control mb-2"
              placeholder="CUIT (11 dígitos) *"
              value={form.cuit}
              onChange={handleChange}
              pattern="\d{11}"
              title="Exactamente 11 números sin guiones"
              required
            />
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email de contacto *"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telefono"
              className="form-control mb-2"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
            />
            <input
              type="text"
              name="calle"
              className="form-control mb-2"
              placeholder="Calle"
              value={form.calle}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ciudad"
              className="form-control mb-3"
              placeholder="Ciudad"
              value={form.ciudad}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-success w-100">
              Guardar
            </button>
          </form>
        </div>

        {/* Listado */}
        <div className="col-md-8">
          {cargando ? (
            <p>Cargando proveedores...</p>
          ) : lista.length === 0 ? (
            <p className="text-muted">No hay proveedores registrados.</p>
          ) : (
            <div className="row">
              {lista.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProveedorCard proveedor={p} onCalificar={handleCalificar} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
