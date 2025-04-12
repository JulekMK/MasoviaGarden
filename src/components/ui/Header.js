import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/header.css';

function Header() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 78) {
        if (currentScroll > lastScrollTop) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToCalendar = (e) => {
    e.preventDefault();
    toggleMenu();
    navigate('/');
    setTimeout(() => {
      const calendarSection = document.getElementById('calendar');
      if (calendarSection) {
        calendarSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header id="header" className={hidden ? "hidden" : ""}>
        <div className="header-logo">
          <img src="logonapis.png" alt="logoMasovia" />
        </div>
        <h1 className="header-title">Masovia Garden</h1>
        <nav className="hlinks">
          <a href="#contact">Kontakt</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#testimonials">Opinie</a>
          <button 
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-links">
          <a href="/" onClick={toggleMenu}>Strona główna</a>
          <a href="#contact" onClick={toggleMenu}>Kontakt</a>
          <Link to="/service/0" onClick={toggleMenu}>Usługi</Link>
          <a href="#portfolio" onClick={toggleMenu}>Portfolio</a>
          <a href="#testimonials" onClick={toggleMenu}>Opinie</a>
          <a href="#about" onClick={toggleMenu}>O nas</a>
          <a href="#" onClick={scrollToCalendar}>Kalendarz</a>
        </nav>
      </div>
    </>
  );
}

export default Header;
