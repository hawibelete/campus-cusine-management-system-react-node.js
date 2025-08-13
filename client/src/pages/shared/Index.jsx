
import React from 'react';

import Lounges from '../components/customer/Lounges';
import Hero from '../components/customer/Hero';
import PopularItems from '../components/customer/PopularItems';
import About from '../components/customer/About';
import Reviews from '../components/customer/Reviews';
import Footer from '../components/customer/Footer';
import Navbar from '../components/customer/Navbar';
import DarkModeToggle from '../components/customer/DarkModeToggle';

const Index = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="position-fixed top-0 end-0 mt-4 me-4 z-3">
        <DarkModeToggle />
      </div>

      <Hero />

      <Lounges />

      <PopularItems />
      
      <About />
      
      <Reviews />

      <Footer />
    </div>
  );
};

export default Index;
