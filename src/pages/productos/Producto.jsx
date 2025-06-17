import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    categoria: "",
    marca: "",
  });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 8,
    totalElements: 0,
    totalPages: 0,
  });
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  // Cargar categorías y marcas
  useEffect(() => {
    const fetchFiltros = async () => {
      try {
        const [categoriasRes, marcasRes] = await Promise.all([
          fetch("http://localhost:8080/api/productos/categorias"),
          fetch("http://localhost:8080/api/productos/marcas"),
        ]);

        if (!categoriasRes.ok || !marcasRes.ok) {
          throw new Error("Error al cargar filtros");
        }

        setCategorias(await categoriasRes.json());
        setMarcas(await marcasRes.json());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFiltros();
  }, []);

  // Cargar productos con filtros y paginación
  const fetchProductos = async () => {
    try {
      setLoading(true);
      let url = new URL("http://localhost:8080/api/productos");

      // Agregar parámetros de paginación
      url.searchParams.append("page", pagination.page);
      url.searchParams.append("size", pagination.size);

      // Agregar filtros si existen
      if (filtros.categoria) {
        url.searchParams.append("categoria", filtros.categoria);
      }
      if (filtros.marca) {
        url.searchParams.append("marca", filtros.marca);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const data = await response.json();

      // Actualizar estado de productos y paginación
      setProductos(data.content || []);
      setPagination({
        ...pagination,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos cuando cambian los filtros o la paginación
  useEffect(() => {
    fetchProductos();
  }, [filtros.categoria, filtros.marca, pagination.page, pagination.size]);

  // Filtrar por búsqueda en el lado del cliente
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-5">Cargando productos...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  // Componente para mostrar cada producto
  const ProductoCard = ({ producto }) => (
    <div className="card h-100 shadow-sm">
      {producto.imagen && (
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{producto.marca}</h6>
        <p className="card-text">{producto.descripcion}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">
            ${producto.precio.toFixed(2)}
          </span>
          {producto.cantidad > 0 ? (
            <span className="badge bg-success">Disponible</span>
          ) : (
            <span className="badge bg-danger">Agotado</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Nuestros Productos</h1>

      <div className="row">
        {/* Filtros laterales */}
        <aside className="col-md-3 mb-4">
          <div
            className="border p-3 rounded shadow-sm sticky-top"
            style={{ top: "20px" }}
          >
            <h5>Filtrar por</h5>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={filtros.categoria}
                onChange={(e) => {
                  setFiltros({ ...filtros, categoria: e.target.value });
                  setPagination({ ...pagination, page: 0 });
                }}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Marca</label>
              <select
                className="form-select"
                value={filtros.marca}
                onChange={(e) => {
                  setFiltros({ ...filtros, marca: e.target.value });
                  setPagination({ ...pagination, page: 0 });
                }}
              >
                <option value="">Todas las marcas</option>
                {marcas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Productos */}
        <main className="col-md-9">
          {/* Buscador */}
          <div className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          {/* Listado de productos */}
          {productos.length === 0 ? (
            <div className="alert alert-info text-center">
              No se encontraron productos con los filtros aplicados
            </div>
          ) : (
            <>
              <div className="row">
                {productosFiltrados.map((producto) => (
                  <div
                    key={producto.id}
                    className="col-md-6 col-lg-4 mb-4 d-flex"
                  >
                    <Link
                      to={`/productos/${producto.id}`}
                      className="text-decoration-none w-100"
                    >
                      <ProductoCard producto={producto} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          pagination.page === 0 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setPagination({
                              ...pagination,
                              page: pagination.page - 1,
                            })
                          }
                          disabled={pagination.page === 0}
                        >
                          &laquo; Anterior
                        </button>
                      </li>

                      {Array.from({ length: pagination.totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            pagination.page === i ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              setPagination({ ...pagination, page: i })
                            }
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          pagination.page >= pagination.totalPages - 1
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setPagination({
                              ...pagination,
                              page: pagination.page + 1,
                            })
                          }
                          disabled={
                            pagination.page >= pagination.totalPages - 1
                          }
                        >
                          Siguiente &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}

              <div className="text-muted text-center mt-3">
                Mostrando {productos.length} de {pagination.totalElements}{" "}
                productos (Página {pagination.page + 1} de{" "}
                {pagination.totalPages})
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Productos;
