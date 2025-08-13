
import React from 'react';

const Hero = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="inline-block px-3 py-1 mb-5 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-800">Premium Food Delivery</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
                Delicious Food
                <span className="block text-primary"> Delivered To You</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Experience the best culinary delights from top restaurants, delivered right to your doorstep. Fast, reliable, and always delicious.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="button-transition bg-primary text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg">
                  Order Now
                </button>
                <button className="button-transition bg-white text-primary font-medium px-8 py-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md">
                  View Menu
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/5 to-primary/10 blur-2xl opacity-70 animate-float"></div>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop"
                alt="Delicious food plate"
                className="relative rounded-2xl shadow-2xl object-cover w-full h-[400px] md:h-[500px]"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Order Tracking</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Live updates on your delivery</p>
              </div>
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.9s' }}>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">30 Min Delivery</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Or your next order is free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
