import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/Services.css';

// Placeholder images from Unsplash
const placeholderImages = {
  first: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80',
  second: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80',
  third: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80',
  fourth: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80'
};

// Tablica z usługami, z pełnymi opisami i zdjęciami
const services = [
  {
    title: "Pielęgnacja i dbanie o ogród",
    images: [placeholderImages.first, placeholderImages.second, placeholderImages.third],
    description: "Kompleksowa pielęgnacja ogrodu przez cały sezon. Nasze usługi obejmują:",
    details: [
      "Regularne koszenie trawnika",
      "Przycinanie żywopłotów i krzewów",
      "Pielęgnacja rabat kwiatowych",
      "Nawożenie i aeracja trawnika",
      "Zwalczanie chwastów i szkodników",
      "Przygotowanie ogrodu do sezonu"
    ]
  },
  {
    title: "Projektowanie krajobrazu",
    images: [placeholderImages.second, placeholderImages.first, placeholderImages.third],
    description: "Indywidualne projekty dopasowane do Twoich potrzeb. Oferujemy:",
    details: [
      "Projekty koncepcyjne ogrodów",
      "Wizualizacje 3D",
      "Dobór roślin",
      "Projektowanie systemów nawadniania",
      "Planowanie oświetlenia ogrodowego",
      "Projekty małej architektury"
    ]
  },
  {
    title: "Nawadnianie i systemy wodne",
    images: [placeholderImages.third, placeholderImages.first, placeholderImages.second],
    description: "Profesjonalne systemy nawadniające do każdego ogrodu. Nasze rozwiązania:",
    details: [
      "Automatyczne systemy nawadniania",
      "Systemy kropelkowe",
      "Zraszacze obrotowe i statyczne",
      "Sterowniki czasowe",
      "Systemy deszczowni",
      "Konserwacja i serwis systemów"
    ]
  },
  {
    title: "Modelowanie drzew i krzewów",
    images: [placeholderImages.fourth, placeholderImages.first, placeholderImages.second],
    description: "Estetyczne przycinanie i formowanie roślin. Specjalizujemy się w:",
    details: [
      "Formowanie żywopłotów",
      "Pielęgnacja drzew owocowych",
      "Topiary i formy geometryczne",
      "Przycinanie sanitarne",
      "Ochrona drzew zabytkowych",
      "Pielęgnacja krzewów ozdobnych"
    ]
  },
  {
    title: "Metamorfozy ogrodu",
    images: [placeholderImages.first, placeholderImages.second, placeholderImages.third],
    description: "Przekształcamy stare ogrody w nowoczesne przestrzenie zieleni. Oferujemy:",
    details: [
      "Kompleksowe przebudowy ogrodów",
      "Modernizacja istniejących nasadzeń",
      "Wymiana nawierzchni",
      "Instalacja nowych elementów małej architektury",
      "Rewitalizacja starych drzew",
      "Tworzenie nowych rabat i kompozycji"
    ]
  },
  {
    title: "Wycinka drzew i krzewów",
    images: [placeholderImages.first, placeholderImages.second, placeholderImages.third],
    description: "Bezpieczna i profesjonalna wycinka niechcianych roślin. Zapewniamy:",
    details: [
      "Wycinka drzew metodą alpinistyczną",
      "Usuwanie konarów i gałęzi",
      "Karczowanie pni",
      "Prace na wysokości",
      "Usuwanie drzew niebezpiecznych",
      "Sprzątanie po wycince"
    ]
  }
];

const Services = () => {
  // Stan dla każdej karuzeli osobno
  const [carouselStates, setCarouselStates] = useState(
    services.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );

  const nextImage = (serviceIndex) => {
    setCarouselStates(prev => ({
      ...prev,
      [serviceIndex]: (prev[serviceIndex] + 1) % services[serviceIndex].images.length
    }));
  };

  const prevImage = (serviceIndex) => {
    setCarouselStates(prev => ({
      ...prev,
      [serviceIndex]: (prev[serviceIndex] - 1 + services[serviceIndex].images.length) % services[serviceIndex].images.length
    }));
  };

  return (
    <div className="services-container">
      <h1 className="services-title">Nasze Usługi</h1>
      
      {services.map((service, index) => (
        <div key={index} className="service-section">
          <h2 className="service-title">{service.title}</h2>
          
          <div className="carousel-container">
            <button 
              className="carousel-button prev"
              onClick={() => prevImage(index)}
            >
              &lt;
            </button>
            
            <div className="carousel">
              <img 
                src={service.images[carouselStates[index]]} 
                alt={service.title} 
                className="service-image"
              />
            </div>
            
            <button 
              className="carousel-button next"
              onClick={() => nextImage(index)}
            >
              &gt;
            </button>
          </div>

          <div className="service-content">
            <p className="service-description">{service.description}</p>
            <ul className="service-details">
              {service.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
