import { useState, useEffect } from "react";
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaBarcode, 
  FaBox, FaTags, FaMoneyBillWave, FaInfoCircle 
} from "react-icons/fa";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProductosCRUD = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    precio: 0,
    cantidad: 0,
    categoria: "",
    descripcion: "",
    imagen: ""
  });

  // Obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProductos(data);
        setFilteredProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Filtrar productos
  useEffect(() => {
    const filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.marca && producto.marca.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (producto.categoria && producto.categoria.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProductos(filtered);
  }, [searchTerm, productos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "precio" || name === "cantidad" ? Number(value) : value
    });
  };

  const openNewModal = () => {
    setCurrentProducto(null);
    setFormData({
      nombre: "",
      marca: "",
      precio: 0,
      cantidad: 0,
      categoria: "",
      descripcion: "",
      imagen: ""
    });
    setModalIsOpen(true);
  };

  const openEditModal = (producto) => {
    setCurrentProducto(producto);
    setFormData({
      nombre: producto.nombre,
      marca: producto.marca || "",
      precio: producto.precio,
      cantidad: producto.cantidad,
      categoria: producto.categoria || "",
      descripcion: producto.descripcion || "",
      imagen: producto.imagen || ""
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = currentProducto 
        ? `http://localhost:8080/api/productos/${currentProducto.id}`
        : "http://localhost:8080/api/productos";

      const method = currentProducto ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      const updatedProduct = await response.json();

      if (currentProducto) {
        setProductos(productos.map(p => 
          p.id === currentProducto.id ? updatedProduct : p
        ));
      } else {
        setProductos([...productos, updatedProduct]);
      }

      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el producto");

      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading && productos.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="productos-crud-container">
      <div className="crud-header">
        <h1><FaBox /> Administración de Productos</h1>
        <div className="header-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={openNewModal} className="btn-add">
            <FaPlus /> Nuevo Producto
          </button>
        </div>
      </div>

      <div className="productos-table-container">
        <table className="productos-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.length > 0 ? (
              filteredProductos.map((producto) => (
                <tr key={producto.id}>
                  <td className="text-center">
                    <FaBarcode /> {producto.id}
                  </td>
                  <td>{producto.nombre}</td>
                  <td>{producto.marca || "-"}</td>
                  <td className="text-right">${producto.precio.toFixed(2)}</td>
                  <td className={`text-center ${producto.cantidad > 0 ? "in-stock" : "out-of-stock"}`}>
                    {producto.cantidad}
                  </td>
                  <td>{producto.categoria || "-"}</td>
                  <td className="actions">
                    <button 
                      onClick={() => openEditModal(producto)} 
                      className="btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(producto.id)} 
                      className="btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear/editar */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="crud-modal"
        overlayClassName="crud-modal-overlay"
      >
        <h2>{currentProducto ? "Editar Producto" : "Nuevo Producto"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              minLength="3"
              maxLength="100"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Marca</label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
                maxLength="50"
              />
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                maxLength="50"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio *</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="3"
              maxLength="500"
            />
          </div>

          <div className="form-group">
            <label>URL de Imagen</label>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleInputChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              maxLength="255"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={closeModal} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Producto"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductosCRUD;