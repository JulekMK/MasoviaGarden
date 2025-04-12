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
import Services from "./components/ui/Services";
import Calendar from './components/ui/Calendar';

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
            <div id="calendar">
              <Calendar />
            </div>
          </>
        } />
        <Route path="/service/:id" element={<Services />} />
      </Routes>
      <Contact />
      <Footer />
    </Router>
  );
}

export default App;
