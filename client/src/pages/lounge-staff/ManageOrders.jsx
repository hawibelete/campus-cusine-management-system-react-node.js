import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Table,
  Badge,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  fetchOrders,
  updateOrderStatus,
} from "@/redux/slices/lounge-staff/ordersSlice";
import LoadingSpinner from "@/components/lounge-staff/LoadingSpinner";
import axios from "@/utility/axios";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { toast } from "sonner"; 

const ManageOrders = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get("filter") || "all";
  const { orders, loading, error, updateLoading } = useSelector(
    (state) => state.orders
  );
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState(initialFilter);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const [unpaidCashOrders, setUnpaidCashOrders] = useState([]);

  useEffect(() => {
    const fetchUnpaidCashOrders = async () => {
      try {
        const response = await axios.get("/api/payment/unpaid-cash-orders");
        const data = response.data;
        console.log("Unpaid Cash Orders:", data);
        setUnpaidCashOrders(data);
        console.log("unpaidCashOrders.length===0")
        console.log(unpaidCashOrders.length===0)
        console.log("Type of data:", typeof data); // Add this
        console.log("Is data an array?", Array.isArray(data)); // Add this
      } catch (error) {
        console.error("Error fetching unpaid cash orders:", error);
        toast.error("Failed to load unpaid cash orders.");
      }
    };

    fetchUnpaidCashOrders();
  }, []);

  const handleStatusChange = async (status) => {
    if (selectedOrder) {
      const result = await dispatch(
        updateOrderStatus({ orderId: selectedOrder.orderId, status })
      );
      if (updateOrderStatus.fulfilled.match(result)) {
        setShowStatusModal(false);
        toast.success(`Order #${selectedOrder.orderId} status updated to ${status}.`);
      } else {
        toast.error(`Failed to update status for Order #${selectedOrder.orderId}.`);
      }
    }
  };

  const getStatusBadge = (status) => {
    let variant = "secondary";
    switch (status) {
      case "pending":
        variant = "warning";
        break;
      case "preparing":
        variant = "info";
        break;
      case "ready":
        variant = "primary";
        break;
      case "completed":
        variant = "success";
        break;
      default:
        variant = "secondary";
    }
    return <Badge bg={variant}>{status}</Badge>;
  };

  const handleMarkAsPaid = async (orderId) => {
    try {
      await axios.patch(`/api/payment/mark-cash-paid/${orderId}`);
      toast.success(`Order #${orderId} marked as paid.`);
      const response = await axios.get("/api/payment/unpaid-cash-orders");
      setUnpaidCashOrders(response.data);
    } catch (error) {
      console.error("Error marking payment as completed:", error);
      toast.error(`Failed to mark Order #${orderId} as paid.`);
    }
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Orders</h1>
        <Form.Select
          className="w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
        </Form.Select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="alert alert-info">No orders found.</div>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId}>
                <td>#{order.orderId}</td>
                <td>
                  <div>{order.customerName}</div>
                </td>
                <td>
                  {new Date(order.orderDate).toLocaleDateString()} <br />
                  <small className="text-muted">
                    {new Date(order.orderDate).toLocaleTimeString()}
                  </small>
                </td>
                <td>
                  {(order.items || []).map((item, index) => (
                    <div key={index}>
                      {item.quantity} x {item.itemName}
                    </div>
                  ))}
                </td>
                <td>ETB {parseFloat(order.totalPrice).toFixed(2)}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowStatusModal(true);
                    }}
                  >
                    Update Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      ---

      <h3>Unpaid Cash Orders</h3>
      {unpaidCashOrders.length === 0 ? (
        <div className="lead mt-3 mb-5">
          No unpaid cash orders found.
        </div>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {unpaidCashOrders.map((order) => (
              <tr key={order.order_id}>
                <td>#{order.order_id}</td>
                <td>{order.customerName}</td>
                <td>
                  {new Date(order.orderDate).toLocaleDateString()} <br />
                  <small className="text-muted">
                    {new Date(order.orderDate).toLocaleTimeString()}
                  </small>
                </td>
                <td>
                  {(order.items || []).map((item, i) => (
                    <div key={i}>
                      {item.quantity} x {item.itemName}
                    </div>
                  ))}
                </td>
                <td>ETB {parseFloat(order.total_price).toFixed(2)}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleMarkAsPaid(order.order_id)}
                  >
                    Mark as Paid
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Order #{selectedOrder?.orderId} - {selectedOrder?.customerName}
            <br />
            Current Status:{" "}
            {selectedOrder && getStatusBadge(selectedOrder.status)}
          </p>
          <div className="d-grid gap-2">
            {["pending", "preparing", "ready", "completed"].map((status) => (
              <Button
                key={status}
                variant={
                  status === "pending"
                    ? "warning"
                    : status === "preparing"
                    ? "info"
                    : status === "ready"
                    ? "primary"
                    : "success"
                }
                onClick={() => handleStatusChange(status)}
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" />{" "}
                    Updating...
                  </>
                ) : (
                  `Mark as ${status.charAt(0).toUpperCase() + status.slice(1)}`
                )}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageOrders;