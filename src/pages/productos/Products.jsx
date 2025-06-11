import React, { useState } from "react";

function Productos() {
  // Simulación de productos (repetidos)
  const productosEjemplo = [
    {
      id: 1,
      nombre: "Monitor LG 24''",
      categoria: "Tecnología",
      marca: "LG",
      precio: 850000,
      stock: 15,
      imagen: "https://via.placeholder.com/200x150?text=Monitor+LG",
    },
    {
      id: 2,
      nombre: "Teclado Mecánico",
      categoria: "Accesorios",
      marca: "Redragon",
      precio: 180000,
      stock: 20,
      imagen: "https://via.placeholder.com/200x150?text=Teclado",
    },
    {
      id: 3,
      nombre: "Impresora Epson",
      categoria: "Oficina",
      marca: "Epson",
      precio: 650000,
      stock: 10,
      imagen: "https://via.placeholder.com/200x150?text=Impresora",
    },
  ];

  // Repetimos productos para simular catálogo
  const [productos] = useState(
    Array(12)
      .fill(null)
      .flatMap((_, i) =>
        productosEjemplo.map((p) => ({ ...p, id: `${p.id}-${i}` }))
      )
  );

  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Nuestros Productos</h1>
      <div className="row">
        {/* Filtros laterales */}
        <aside className="col-md-3 mb-4">
          <div className="border p-3 rounded shadow-sm">
            <h5>Filtrar por</h5>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select className="form-select" disabled>
                <option>Todos</option>
                <option>Tecnología</option>
                <option>Accesorios</option>
                <option>Oficina</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Marca</label>
              <select className="form-select" disabled>
                <option>Todas</option>
                <option>LG</option>
                <option>Redragon</option>
                <option>Epson</option>
              </select>
            </div>
            <button className="btn btn-outline-secondary w-100" disabled>
              Aplicar filtros
            </button>
          </div>
        </aside>

        {/* Productos */}
        <main className="col-md-9">
          {/* Buscador */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="row">
            {productosFiltrados.slice(0, 8).map((producto) => (
              <div key={producto.id} className="col-md-6 col-lg-3 mb-4 d-flex">
                <div className="card w-100 shadow-sm">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img-top"
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">
                      <strong>Categoría:</strong> {producto.categoria}
                      <br />
                      <strong>Marca:</strong> {producto.marca}
                    </p>
                    <p className="card-text">
                      <strong>Precio:</strong> $
                      {producto.precio.toLocaleString("es-CO")}
                    </p>
                    <p className="card-text">
                      <strong>Stock:</strong> {producto.stock}
                    </p>
                    <button className="btn btn-primary mt-2" disabled>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón "Ver más" */}
          {productosFiltrados.length > 8 && (
            <div className="text-center mt-4">
              <button className="btn btn-outline-primary" disabled>
                Ver más productos
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Productos;
