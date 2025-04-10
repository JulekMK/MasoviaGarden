import React from 'react';

function Testimonials() {
  const reviews = [
    {
      text: '"Jestem bardzo zadowolona z wykonanej usługi. Trawnik został skoszony szybko i sprawnie. Pan Radosław jest kontaktową osobą, która ma fach w ręku."',
      author: "- Zofia, Warszawa",
      rating: 5
     
    },
    {
      text: '"Jestem wręcz zachwycony jakością prac wykonanych przez tę firmę. Myślałem że aż tak rzetelnych firm już nie ma. W przeszłości zlecałem prace ogrodnicze innym firmom, żadna nie była aż tak rzetelna. Z całą odpowiedzialnością szczere polecam skorzystanie z usług tej firmy - naprawdę warto. Ceny nie są wygórowane, a jakość wykonanych prac naprawdę cieszy."',
      author: "- Bogdan, Warszawa",
      rating: 5
    },
    {
      text: '"Pan Radoslaw to bardzo rzetelna osoba ! Punktualny, profesjonalny, przygotowany logistycznie do pracy . Zrealizował zlecenie w 100% Bardzo polecam !"',
      author: "- Magdalena, Korytnica",
      rating: 5
    },
    {
      text: '"Miło, kulturalnie, pełen profesjonalizm. Ogród dawno tak nie wyglądał a poprzedni ogrodnik może się od Pana Radosława uczyć."',
      author: "- Tomasz, Wołomin",
      rating: 5
    },
    {
      text: '"Doskonały kontakt, zero problemów, usługa wykonana wzorowo."',
      author: "- Arkadiusz, Legionowo",
      rating: 5
    },
    {
      text: '"Usługa wykonana szybko i sprawnie, wysokiej klasy sprzętem. Kontakt z p. Radosława bardzo dobry. Polecam! :)"',
      author: "- Piotr, Brok",
      rating: 5
    }
  ];

  

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star" style={{ color: '#FFD700' }}></i>);  // Złota gwiazdka
      } else {
        stars.push(<i key={i} className="fas fa-star" style={{ color: '#ddd' }}></i>);  // Pusta gwiazdka
      }
    }
    return stars;
    
  };

  return (
    <section className="testimonials"  id="testimonials">
      <h2>Opinie naszych klientów</h2>
      <div className="testimonial-container">
        {reviews.map((review, index) => (
          <div key={index} className="testimonial">
            {/* Gwiazdki przed tekstem */}
            <div className="stars">
              {renderStars(review.rating)}
            </div>
            <p>"{review.text}"</p>
            <span>{review.author}</span>
          </div>
        ))}
      </div>
      <p className="comments-source">Komentarze pochodzą z naszego profilu na stronie fixly.pl</p>
    </section>
  );
}

export default Testimonials;
