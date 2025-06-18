import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Bienvenido a MarketCali</h1>
          <p className="hero-description">
            La solución completa para la gestión de tu negocio. Controla
            inventarios, ventas y facturación en un solo lugar.
          </p>
          <div className="hero-buttons">
            <Link to="/productos" className="hero-button primary">
              Explorar Productos
            </Link>
            <Link to="/login" className="hero-button outline">
              Panel Administrativo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Potencia tu negocio con MarketCali</h2>

          <div className="features-grid">
            {[
              {
                icon: "📊",
                title: "Reportes en Tiempo Real",
                description:
                  "Genera reportes detallados de ventas e inventario al instante.",
              },
              {
                icon: "📦",
                title: "Gestión de Inventario",
                description:
                  "Controla tu stock por categorías, marcas y códigos de barras.",
              },
              {
                icon: "🧑‍💼",
                title: "Control de Accesos",
                description:
                  "Asigna permisos diferenciados para cada tipo de usuario.",
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="user-types-section">
        <div className="user-types-container">
          <h2 className="section-title">Diseñado para todos los usuarios</h2>

          <div className="user-types-grid">
            {[
              {
                type: "Administradores",
                features: [
                  "Gestión completa del sistema",
                  "Configuración de permisos",
                  "Generación de reportes",
                ],
              },
              {
                type: "Empleados",
                features: [
                  "Registro de ventas",
                  "Gestión de productos",
                  "Generación de facturas",
                ],
              },
              {
                type: "Clientes",
                features: [
                  "Consulta de productos",
                  "Visualización de facturas",
                  "Historial de compras",
                ],
              },
            ].map((userType, index) => (
              <div key={index} className="user-type-card">
                <h3
                  className={`user-type-title ${userType.type.toLowerCase()}`}
                >
                  {userType.type}
                </h3>
                <ul className="user-type-features">
                  {userType.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="check-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">¿Listo para transformar tu negocio?</h2>
          <p className="cta-description">
            Comienza hoy mismo con MarketCali y lleva tu gestión al siguiente
            nivel.
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button primary">
              Iniciar Sesión
            </Link>
            <Link to="/contact" className="cta-button outline">
              Contactar Soporte
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
