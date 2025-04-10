import React from 'react';
import { useParams } from 'react-router-dom';

// Tablica z usługami, z pełnymi opisami
const services = [
  { title: "Pielęgnacja i dbanie o ogród", img: "first.jpg", description: "Kompleksowa pielęgnacja ogrodu przez cały sezon." },
  { title: "Projektowanie krajobrazu", img: "second.jpg", description: "Indywidualne projekty dopasowane do Twoich potrzeb." },
  { title: "Nawadnianie i systemy wodne", img: "third.jpg", description: "Profesjonalne systemy nawadniające do każdego ogrodu." },
  { title: "Modelowanie drzew i krzewów", img: "fourth.jpg", description: "Estetyczne przycinanie i formowanie roślin." },
  { title: "Metamorfozy ogrodu", img: "first.jpg", description: "Przekształcamy stare ogrody w nowoczesne przestrzenie zieleni." },
  { title: "Wycina drzew i krzewów", img: "first.jpg", description: "Bezpieczna i profesjonalna wycinka niechcianych roślin." },
];

const Services = () => {
  const { id } = useParams();
  const service = services[id];

  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <h1>Nasze Usługi</h1>
      
      {/* Wyświetlamy wszystkie usługi jedna pod drugą */}
      {services.map((service, index) => (
        <div key={index} className="service-detail" style={{ marginBottom: "40px" }}>
          <h2>{service.title}</h2>
          <img src={`/${service.img}`} alt={service.title} style={{ maxWidth: "600px", width: "100%", borderRadius: "10px" }} />
          <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>{service.description}</p>
        </div>
      ))}
    </div>
  );
};



export default Services;
