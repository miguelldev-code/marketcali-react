import React from "react";

function About() {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">¿Quiénes Somos?</h1>

      <section className="mb-5">
        <p>
          <strong>MarketCali</strong> es una plataforma de software diseñada
          para facilitar la gestión administrativa y comercial de empresas.
          Nuestro objetivo es ofrecer una solución eficiente que permita
          controlar productos, empleados, ventas y facturación desde un solo
          lugar.
        </p>
        <p>
          Somos una iniciativa desarrollada como parte de un proyecto formativo,
          enfocado en mejorar los procesos de venta y organización dentro de las
          empresas locales.
        </p>
      </section>

      <section className="mb-5">
        <h3>Misión</h3>
        <p>
          Brindar un sistema accesible y funcional que permita a las empresas
          gestionar su inventario, ventas y personal de forma rápida, segura y
          organizada.
        </p>
      </section>

      <section className="mb-5">
        <h3>Visión</h3>
        <p>
          Ser una solución reconocida por su facilidad de uso y eficiencia,
          expandiendo su uso en empresas de diferentes sectores a nivel
          nacional.
        </p>
      </section>

      <section className="mb-5">
        <h3>Valores</h3>
        <ul className="list-group">
          <li className="list-group-item">✅ Compromiso con la calidad</li>
          <li className="list-group-item">✅ Responsabilidad y ética</li>
          <li className="list-group-item">✅ Innovación tecnológica</li>
          <li className="list-group-item">
            ✅ Accesibilidad y facilidad de uso
          </li>
        </ul>
      </section>
    </div>
  );
}

export default About;
