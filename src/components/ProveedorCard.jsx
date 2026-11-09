const ProveedorCard = ({ proveedor, onCalificar }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{proveedor.razonSocial}</h5>
        <p className="card-text mb-1">
          <strong>CUIT:</strong> {proveedor.cuit}
        </p>
        <p className="card-text mb-1">
          <strong>Email:</strong> {proveedor.contacto?.email}
        </p>
        {proveedor.contacto?.telefono && (
          <p className="card-text mb-1">
            <strong>Tel:</strong> {proveedor.contacto.telefono}
          </p>
        )}
        <p className="card-text mb-1">
          <strong>Ciudad:</strong> {proveedor.direccion?.ciudad || '—'}
        </p>
        <p className="card-text mb-2">
          <strong>Calificación:</strong> {proveedor.calificacion} ⭐
        </p>

        <div className="d-flex gap-1 flex-wrap">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`btn btn-sm ${
                proveedor.calificacion === n ? 'btn-warning' : 'btn-outline-warning'
              }`}
              onClick={() => onCalificar(proveedor._id, n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProveedorCard;
