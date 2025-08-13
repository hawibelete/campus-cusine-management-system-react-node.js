import {
  getOrders,
  getOrdersByLounge,
  getOrder,
  getOrderItems,
  updateOrderStatus,
} from "../models/orderModel.js";

export const fetchAllOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await getOrders();
    } else {
      orders = await getOrdersByLounge(req.user.loungeId);
    }

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchOrderDetails = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await getOrder(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      req.user.role === "lounge_staff" &&
      order.lounge_id !== req.user.loungeId
    ) {
      return res.status(403).json({
        message: "Access denied. You can only view orders from your lounge.",
      });
    }

    let items;
    try {
      items = await getOrderItems(orderId);
    } catch (itemError) {
      console.error("Error fetching order items:", itemError);
      return res.status(500).json({ message: "Error loading order items" });
    }
    order.items = items;
    res.json(order);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "preparing", "ready", "completed"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await getOrder(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      req.user.role === "lounge_staff" &&
      order.lounge_id !== req.user.loungeId
    ) {
      return res.status(403).json({
        message: "Access denied. You can only manage orders from your lounge.",
      });
    }

    const updated = await updateOrderStatus(id, status);
    if (!updated) {
      return res
        .status(500)
        .json({ message: "Failed to update order status." });
    }
    res.json({ message: "Order status updated successfully", updated });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};
