import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/customer/Home/Navbar";
import Footer from "@/components/customer/Home/Footer";
import { Toaster } from "sonner";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

const CustomerLayout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Navbar />
        <Toaster position="top-right" />
        <main className="pt-3 mt-3">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </QueryClientProvider>
  );
};

export default CustomerLayout;
