import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";

function Navbar() {
  return (
    <header className="bg-primary text-white py-3">
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="MarketCali Logo" className="" />
            MarketCali
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  ¿Quiénes Somos?
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
