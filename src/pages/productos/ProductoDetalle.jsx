import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/${id}`
        );
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducto();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!producto) return <div>No se encontró el producto</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          {producto.imagen && (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded shadow"
            />
          )}
        </div>
        <div className="col-md-6">
          <h1>{producto.nombre}</h1>
          <h3 className="text-muted">{producto.marca}</h3>
          <p className="h2 text-primary my-4">${producto.precio.toFixed(2)}</p>
          <p>{producto.descripcion}</p>
          <p>Categoría: {producto.categoria}</p>
          <p>
            Disponibilidad: {producto.cantidad > 0 ? "En stock" : "Agotado"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
