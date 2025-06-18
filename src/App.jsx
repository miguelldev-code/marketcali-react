import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import About from "./pages/others/About";
import Producto from "./pages/productos/Producto";
import ProductoDetalle from "./pages/productos/ProductoDetalle";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/productos" element={<Producto />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
