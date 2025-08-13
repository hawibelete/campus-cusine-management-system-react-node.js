
import React from 'react';
import { Truck, Clock, ShieldCheck, CreditCard } from 'lucide-react';

const SupportFeatures = () => {
  const features = [
    {
      icon: <Truck size={24} />,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50"
    },
    {
      icon: <Clock size={24} />,
      title: "24/7 Support",
      description: "Our team is at your service anytime"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Secure Payment",
      description: "Your payments are safe with us"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Worldwide Delivery",
      description: "We deliver to over 100 countries"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center p-6 glassmorphism rounded-xl card-hover"
          >
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportFeatures;
