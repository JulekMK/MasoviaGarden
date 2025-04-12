import React from 'react';


function Contact() {
  return (
    
    <section className="contact" id="contact">
      <h2>Kontakt</h2>
      <div className="contact-info">
        <div className="contact-item">
          <h3>Telefon:</h3>
          <p>504 957 783</p>
        </div>
        <div className="contact-item">
          <h3>Email:</h3>
          <p>masovia.garden@gmail.com</p>
        </div>
        <div className="contact-item">
          <h3>Social Media:</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/masviagardens" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-lg"></i> Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
