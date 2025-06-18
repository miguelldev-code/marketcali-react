import { useEffect, useState } from "react";

function Producto() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos", {
      mode: "cors", // Explicitly set CORS mode
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Producto;
