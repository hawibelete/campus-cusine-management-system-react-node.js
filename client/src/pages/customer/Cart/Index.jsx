
import React from 'react';
import Hero from '@/components/customer/Cart/Hero';
import FoodList from '@/components/customer/Cart/FoodList';
import SupportFeatures from '@/components/customer/Cart/SupportFeatures';

const Index = () => {
  return (
    <div className="container-fluid px-0">
      <Hero />
      <FoodList />
      <SupportFeatures />
    </div>
  );
};

export default Index;
