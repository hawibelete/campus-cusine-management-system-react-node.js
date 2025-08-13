import React from "react";
import { 
  Navbar,
  Hero,
  Lounges,
  PopularItems,
  About,
  Reviews,
  Footer 
} from "@/components/customer/Home";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const Home = () => {
  useAuthCheck();
  return (
    <div className="page-wrapper">

      <Hero />
      <Lounges />
      <PopularItems />
      <About />
      <Reviews />

    </div>
  );
};

export default Home;
