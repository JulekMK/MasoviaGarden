import React from 'react';
import Card from './Card'; // Upewnij się, że ścieżka jest poprawna

const services = [
  { title: "Pielęgnacja ogodów", img: "first.jpg" },
  { title: "Projektowanie", img: "second.jpg" },
  { title: "Systemy nawadniania", img: "third.jpg" },
  { title: "Modelowanie drzew i krzewów", img: "fourth2.png" },
  { title: "Aranżacje od podstaw", img: "first.jpg" },
  { title: "Mini koparka", img: "first.jpg" },
];

const Main = () => {
  return (
    <main id="main">
      <h1 className="main-title">Masovia Garden</h1>
      <div id='napisy1'>
        <h2>Co oferujemy?</h2>
      </div>

      <div className="card-container">
        {services.map((service, index) => (
          <Card key={index} title={service.title} img={service.img} index={index} />
        ))}
      </div>
    </main>
  );
};

export default Main;
