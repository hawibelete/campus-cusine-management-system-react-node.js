import { getPrepaidServiceOrders, getPrepaidServiceWallet, isPrepaidServiceMember, isUserPrepaidForLounge, placePrepaidOrderService } from "../models/prepaidModel.js";

export const fetchPrepaidOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("User ID from fetch prepaid orders:", userId);
  
      const orders = await getPrepaidServiceOrders(userId);
  
      if (!orders || orders.length === 0) {
        console.log("No prepaid service orders found for user ID:", userId);
        return res.json([]); 
      }
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch prepaid service orders" });
    }
  };
  

export const fetchPrepaidWallet = async (req, res) => {
    try {
        const wallet = await getPrepaidServiceWallet(req.user.id);
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found for this user" });
        }
        res.json(wallet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch prepaid service wallet" });
    }
};

export const checkPrepaidMembership = async (req, res) => {
    try {
        const isMember = await isPrepaidServiceMember(req.user.id);
        res.json({ isMember });
    } catch (error) {
        console.error("❌ Controller Error (checkPrepaidMembership):", error);
        res.status(500).json({ message: "Failed to check prepaid membership" });
    }
};

export const checkPrepaidStatusForLounge = async (req, res) => {
    const userId = req.user.id;
    const menuItemId = req.params.id;

    try {
        const isMember = await isUserPrepaidForLounge(userId, menuItemId);
        res.json({ isMember });
    } catch (error) {
        console.error("❌ Controller Error (checkPrepaidStatusForLounge):", error);
        res.status(500).json({ message: "Failed to check prepaid membership for lounge" });
    }
};

export const placePrepaidOrder = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body; 

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "No items provided" });
    }

    try {
        const result = await placePrepaidOrderService(userId, items);
        res.status(201).json({ message: "Prepaid order placed successfully", order_id: result.orderId });
    } catch (error) {
        console.error("❌ Controller Error (placePrepaidOrder):", error);
        res.status(500).json({ message: error.message || "Failed to place prepaid order" });
    }
};
