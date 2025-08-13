import {
    getCartByUserId,
    upsertCartItem,
    clearCartByUserId,
  } from "../models/cartModel.js";
  
  export const fetchCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await getCartByUserId(userId);
      console.log("from the cart controller");
      console.log("Fetched cart for user:", userId, cart);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
export const saveCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = req.body; 

    for (const item of cartItems) {
      await upsertCartItem(userId, item.menu_item_id, item.quantity);
    }

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addOrUpdateCartItem = async (req, res) => {
  const { menu_item_id, quantity } = req.body;
  const userId = req.user.id;
  try {
    await upsertCartItem(userId, menu_item_id, quantity);
    res.status(200).json({ message: "Item added/updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
  export const clearCart = async (req, res) => {
    try {
      const userId = req.user.id;
      await clearCartByUserId(userId);
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  