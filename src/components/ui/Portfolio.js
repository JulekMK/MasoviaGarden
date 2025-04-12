import React, { useState, useEffect } from "react";
import "../../styles/Portfolio.css";


const images = [
  "first.jpg",
  "third.jpg",
  "fourth.jpg",
  "fifth.jpg"
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-przewijanie co 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="portfolio-section" id="portfolio">
      <h2>Nasze Projekty</h2>
      <div className="carousel-container">
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <div className="carousel-slide">
          <img src={images[currentIndex]} alt={`Projekt ${currentIndex + 1}`} />
        </div>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
    </div>
  );
};

export default Portfolio;
