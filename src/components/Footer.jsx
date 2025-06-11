import logo from "../assets/logo3.png";

function Footer() {
  return (
    <footer className="bg-primary text-white pt-4 mt-5">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          {/* Logo + nombre */}
          <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
            <img src={logo} alt="MarketCali Logo" width="50" className="me-2" />
            <div>
              <h5 className="mb-0">MarketCali</h5>
              <small>Desarrollado por Miguel Ortiz</small>
            </div>
          </div>

          {/* Derechos */}
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-0 small">
              &copy; {new Date().getFullYear()} MarketCali. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
