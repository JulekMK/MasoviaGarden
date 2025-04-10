import React, { useState, useEffect } from "react";

function Header() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 78) {
        // Jeśli przewinięto więcej niż 100px, sprawdzamy kierunek przewijania
        if (currentScroll > lastScrollTop) {
          setHidden(true); // Przewijanie w dół - chowamy header
        } else {
          setHidden(false); // Przewijanie w górę - pokazujemy header
        }
      } else {
        setHidden(false); // Jeśli jesteśmy na górze, header pozostaje widoczny
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header id="header" className={hidden ? "hidden" : ""}>
      <div className="header-logo">
        <img src="logonapis.png" alt="logoMasovia" />
      </div>
      <h1 className="header-title desktop-title">Masovia Garden</h1>
      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Menu">
        <span className={isMenuOpen ? "active" : ""}></span>
        <span className={isMenuOpen ? "active" : ""}></span>
        <span className={isMenuOpen ? "active" : ""}></span>
      </button>
      <nav className={`hlinks ${isMenuOpen ? "active" : ""}`}>
        <a href="#contact" onClick={toggleMenu}>Kontakt</a>
        <a href="#portfolio" onClick={toggleMenu}>Portfolio</a>
        <a href="#testimonials" onClick={toggleMenu}>Opinie</a>
        <a href="#about" onClick={toggleMenu}>O nas</a>
      </nav>
    </header>
  );
}

export default Header;
