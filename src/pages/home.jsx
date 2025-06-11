import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Sección de bienvenida */}
      <section className="container text-center py-5">
        <h1>Bienvenido a MarketCali</h1>
        <p className="lead">
          Un sistema moderno de facturación y gestión administrativa. Organiza
          productos, controla ventas y da seguimiento al inventario de tu
          empresa.
        </p>
      </section>

      {/* Funciones principales */}
      <section className="container py-3">
        <h2 className="mb-4">¿Qué puedes hacer con MarketCali?</h2>
        <ul className="list-group">
          <li className="list-group-item">
            ✅ Administrar ventas y generar reportes
          </li>
          <li className="list-group-item">
            ✅ Gestionar inventario por categoría, marca e ID
          </li>
          <li className="list-group-item">
            ✅ Procesar productos y generar facturación
          </li>
          <li className="list-group-item">
            ✅ Visualizar productos mediante lector de código de barras
          </li>
          <li className="list-group-item">
            ✅ Controlar permisos de empleados
          </li>
        </ul>
      </section>

      {/* Tipos de usuarios */}
      <section className="container py-5">
        <h2 className="mb-4">Usuarios del sistema</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <h4>Jefe/Administrador</h4>
            <p>
              Gestiona todo el software: registros, permisos y configuraciones.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h4>Empleado</h4>
            <p>
              Registra productos, genera facturas y lleva reportes mensuales.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h4>Cliente</h4>
            <p>Visualiza los productos comprados y recibe su factura final.</p>
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="text-center py-5 bg-light">
        <h2>Accesos rápidos</h2>
        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
          <Link to="/productos" className="btn btn-outline-primary">
            Ver productos
          </Link>
          <Link to="/login" className="btn btn-primary">
            Iniciar sesión
          </Link>
          <Link to="/contacto" className="btn btn-secondary">
            Contacto
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
