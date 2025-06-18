import React from "react";
import {
  FaBullseye,
  FaEye,
  FaHeart,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">¿Quiénes Somos?</h1>
          <p className="hero-subtitle">
            Conoce más sobre MarketCali y nuestra misión
          </p>
        </div>
      </section>

      <div className="about-container">
        <section className="about-section about-intro">
          <div className="section-content">
            <h2 className="section-title">Nuestra Historia</h2>
            <div className="section-text">
              <p>
                <strong>MarketCali</strong> es una plataforma de software
                innovadora diseñada para revolucionar la gestión administrativa
                y comercial de empresas. Nuestro objetivo es ofrecer una
                solución integral que permita controlar productos, empleados,
                ventas y facturación desde un único ecosistema digital.
              </p>
              <p>
                Surgimos como una iniciativa desarrollada por apasionados de la
                tecnología, enfocados en optimizar los procesos de venta y
                organización dentro del ecosistema empresarial local y regional.
              </p>
            </div>
          </div>
          <div className="section-image">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Equipo de MarketCali trabajando"
              className="about-image"
            />
          </div>
        </section>

        <section className="about-section about-mission">
          <div className="mission-card">
            <div className="mission-icon">
              <FaBullseye />
            </div>
            <h3>Misión</h3>
            <p>
              Brindar un sistema accesible y funcional que permita a las
              empresas gestionar su inventario, ventas y personal de forma
              rápida, segura y organizada, adaptándose a las necesidades
              específicas de cada negocio.
            </p>
          </div>

          <div className="mission-card">
            <div className="mission-icon">
              <FaEye />
            </div>
            <h3>Visión</h3>
            <p>
              Ser la solución líder reconocida por su facilidad de uso y
              eficiencia, expandiendo nuestro impacto en empresas de diversos
              sectores a nivel nacional e internacional para 2025.
            </p>
          </div>
        </section>

        <section className="about-values">
          <h2 className="values-title">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h4>Compromiso con la calidad</h4>
              <p>
                Entregamos productos y servicios que superan las expectativas de
                nuestros clientes.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h4>Responsabilidad y ética</h4>
              <p>
                Actuamos con integridad en todas nuestras relaciones
                comerciales.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaLightbulb />
              </div>
              <h4>Innovación tecnológica</h4>
              <p>
                Buscamos constantemente nuevas formas de mejorar y optimizar
                procesos.
              </p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2 className="team-title">Conoce a nuestro equipo</h2>
          <p className="team-subtitle">
            Profesionales comprometidos con tu éxito
          </p>
          <div className="team-members">
            {/* Aquí puedes agregar tarjetas de equipo si lo deseas */}
            <button className="team-cta">Ver todo el equipo</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
