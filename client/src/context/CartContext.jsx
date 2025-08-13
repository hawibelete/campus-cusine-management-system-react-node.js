import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import axios from '@/utility/axios';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartInitialized, setCartInitialized] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart', { withCredentials: true });
        setCart(response.data);
      setCartInitialized(true);
      } catch (error) {
        console.error('Failed to fetch cart from API', error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (!cartInitialized || cart.length === 0) return;
  
    const timeout = setTimeout(async () => {
      try {
        await axios.post('/api/cart', cart, { withCredentials: true });
      } catch (error) {
        console.error('Failed to save cart to API', error);
      }
    }, 500);
  
    return () => clearTimeout(timeout);
  }, [cart, cartInitialized]);


  const addToCart = (food) => {
    setCart(prevCart => {
      if (prevCart.length > 0) {
        const currentLoungeId = prevCart[0].lounge_id;
        if (food.lounge_id !== currentLoungeId) {
          toast.error("You can only order from one lounge at a time. Please clear your cart to add items from another lounge.");
          return prevCart; 
        }
      }
  console.log("food")
      console.log(food)
      const existingItemIndex = prevCart.findIndex(item => item.menu_item_id === food.menu_item_id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        toast.success(`Added another ${food.name} to cart`);
        return updatedCart;
      } else {
        toast.success(`${food.name} added to cart`);
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };
  

  const removeFromCart = (menu_item_id) => {
    setCart(prevCart => {
      const foodItem = prevCart.find(item => item.menu_item_id === menu_item_id);
      if (foodItem) {
        toast.success(`${foodItem.name} removed from cart`);
      }
      return prevCart.filter(item => item.menu_item_id !== menu_item_id);
    });
  };

  const updateQuantity = (menu_item_id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.menu_item_id === menu_item_id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
    axios.post('/api/cart/clear', {}, { withCredentials: true }).catch(console.error);
  };
  

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 12 : 0;
  const total = subtotal + shippingFee;

  const openCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCartOpen(true);
    }, 800);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      shippingFee,
      total,
      isCartOpen,
      openCart,
      closeCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
