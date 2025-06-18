import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaChevronRight,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", name: "Facebook" },
    { icon: <FaInstagram />, url: "#", name: "Instagram" },
    { icon: <FaTwitter />, url: "#", name: "Twitter" },
    { icon: <FaLinkedin />, url: "#", name: "LinkedIn" },
  ];

  const footerLinks = [
    {
      title: "Enlaces Rápidos",
      links: [
        { text: "Inicio", url: "/" },
        { text: "Productos", url: "/products" },
        { text: "Servicios", url: "/services" },
        { text: "Contacto", url: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Términos y condiciones", url: "/terms" },
        { text: "Política de privacidad", url: "/privacy" },
        { text: "Aviso legal", url: "/legal" },
        { text: "Cookies", url: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src={logo}
              alt="MarketCali Logo"
              className="footer-logo"
              width="50"
              height="50"
              loading="lazy"
            />
            <div className="brand-info">
              <h5>MarketCali</h5>
              <p>
                Solución completa para tu negocio con las mejores herramientas
                del mercado.
              </p>
            </div>
          </div>

          <div className="footer-links-container">
            {footerLinks.map((section, index) => (
              <div className="link-section" key={index}>
                <h6>{section.title}</h6>
                <ul>
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.url} className="flex items-center gap-1">
                        <FaChevronRight className="text-xs text-blue-400" />
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-social">
            <div className="social-header">
              <h6>Síguenos</h6>
              <p className="text-gray-400 text-sm">
                Conecta con nosotros en redes sociales
              </p>
            </div>
            <div className="social-icons">
              {socialLinks.map((social, i) => (
                <a
                  href={social.url}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} MarketCali. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link
              to="/sitemap"
              className="text-gray-400 hover:text-white transition"
            >
              Mapa del sitio
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-white transition"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
