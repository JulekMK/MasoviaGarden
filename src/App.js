import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/ui/Header';
import Main from './components/ui/Main';
import Footer from './components/ui/Footer';
import Testimonials from './components/ui/Testimonials';
import AboutUs from './components/ui/AboutUs';
import Contact from './components/ui/Contact';
import Portfolio from "./components/ui/Portfolio";
import ServiceDetail from "./components/ui/ServiceDetail"; // Jeśli jeszcze chcesz go zachować
import Services from "./components/ui/Services"; // Komponent z usługami
import Calendar from './components/ui/Calendar'; // Zakładając, że Calendar.js jest w folderze components


import "./styles/Portfolio.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Main />
            <AboutUs />
            <Testimonials />
            <Portfolio />
            <Calendar /> {/* Dodanie komponentu Calendar */}
          </>
        } />
        <Route path="/service/:id" element={<ServiceDetail />} />
      </Routes>
      <Contact />
      <Footer />
    </Router>
  );
}

export default App;
