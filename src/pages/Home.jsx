import React from 'react';
import '../home.css';
import useOnScreen from '../hooks/useOnScreen';
import DesignTrail from '../components/DesignTrail'; // ← efecto de cursor

export default function Home() {
  // Hooks de visibilidad
  const [refHero, heroVisible] = useOnScreen('-100px');
  const [refNovedades, novVisible] = useOnScreen('-100px');
  const [refFAQ, faqVisible] = useOnScreen('-100px');
  const [refContacto, contactVisible] = useOnScreen('-100px');

  // Configuración del navbar
  const sections = [
    { id: 'hero', label: 'Inicio', ref: refHero, visible: heroVisible },
    { id: 'novedades', label: 'Novedades', ref: refNovedades, visible: novVisible },
    { id: 'faq', label: 'Preguntas', ref: refFAQ, visible: faqVisible },
    { id: 'contacto', label: 'Contacto', ref: refContacto, visible: contactVisible },
  ];

  return (
    <div className="home-page">
      <DesignTrail /> {/* ← cursor visual agregado */}

      {/* Navbar */}
      <nav className="home-nav">
        <ul>
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={s.visible ? 'active' : ''}>
                {s.label}
              </a>
            </li>
          ))}
          <li style={{ marginLeft: 'auto' }}>
            <a href="/Login" className="btn ingreso">Ingresar</a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        ref={refHero}
        className={`home-section card animate-on-scroll ${heroVisible ? 'visible' : ''}`}
      >
        <div className="circle yellow" style={{ position: 'absolute', top: '-30px', left: '20px' }} />
        <div className="circle gray" style={{ position: 'absolute', top: '40px', right: '10%' }} />

        <h1 className="animated-title">INVENSTOCK</h1>
        <p>Administra tu inventario de forma fácil y efectiva</p>
      </section>

      {/* Novedades */}
      <section
        id="novedades"
        ref={refNovedades}
        className={`home-section card animate-on-scroll ${novVisible ? 'visible' : ''}`}
      >
        <div className="circle yellow" style={{ position: 'absolute', top: '-20px', left: '50px' }} />
        <div className="circle gray" style={{ position: 'absolute', top: '60px', right: '30px' }} />

        <h2>Novedades</h2>
        <ul>
          <li>v2.1: Nuevo gráfico de rotación de stock</li>
          <li>v2.0: Soporte multiusuario y roles avanzados</li>
          <li>v1.5: Mejoras de rendimiento en listados</li>
        </ul>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        ref={refFAQ}
        className={`home-section card animate-on-scroll ${faqVisible ? 'visible' : ''}`}
      >
        <div className="circle yellow" style={{ position: 'absolute', bottom: '-30px', left: '10%' }} />
        <div className="circle gray" style={{ position: 'absolute', top: '20px', right: '10%' }} />

        <h2>Preguntas Frecuentes</h2>
        <details>
          <summary>¿Cómo agrego un producto?</summary>
          <p>Ve a “Registrar Producto” en tu panel de control, completa los datos y guarda.</p>
        </details>
        <details>
          <summary>¿Puedo asignar roles a otros usuarios?</summary>
          <p>Sí, con el rol SuperAdmin puedes gestionar roles desde “Perfil → Administrar usuarios”.</p>
        </details>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        ref={refContacto}
        className={`home-section card animate-on-scroll ${contactVisible ? 'visible' : ''}`}
      >
        <div className="circle yellow" style={{ position: 'absolute', top: '-30px', right: '20px' }} />
        <div className="circle gray" style={{ position: 'absolute', bottom: '-20px', left: '40px' }} />

        <h2>Contáctanos</h2>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Tu nombre" required />
          <input type="email" name="email" placeholder="Tu correo" required />
          <textarea name="message" placeholder="¿En qué podemos ayudarte?" required />
          <button type="submit" className="btn envio">Enviar mensaje</button>
        </form>
      </section>
      <div className="background-decorations">
        {/* círculos extra en espacios vacíos entre secciones */}
        <div className="circle yellow" style={{ top: '300px', left: '5%' }} />
        <div className="circle gray" style={{ top: '100px', right: '10%' }} />
        <div className="circle yellow" style={{ top: '290px', left: '15%' }} />
        <div className="circle gray" style={{ top: '101px', right: '5%' }} />
        <div className="circle yellow" style={{ top: '1500dpx', left: '25%' }} />
        <div className="circle gray" style={{ top: '100px', right: '20%' }} />
        <div className="circle yellow" style={{ top: '100px', left: '5%' }} />
        <div className="circle gray" style={{ top: '250px', right: '10%' }} />
        <div className="circle yellow" style={{ top: '400px', left: '20%' }} />
        <div className="circle yellow" style={{ top: '400px', left: '20%' }} />
        <div className="circle yellow" style={{ top: '400px', left: '20%' }} />
        <div className="circle yellow" style={{ top: '400px', left: '20%' }} />
        <div className="circle yellow" style={{ top: '400px', left: '20%' }} />
      </div>

      {/* Footer */}
      <footer className="home-footer">
        © {new Date().getFullYear()} InvenStock. Todos los derechos reservados.
      </footer>
    </div>
  );
}