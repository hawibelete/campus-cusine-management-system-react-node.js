import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import HeroSection from "@/components/shared/HeroSection";
import axios from "@/utility/axios";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const CheckoutPage = () => {
  useAuthCheck();
  const { cart, total, subtotal, shippingFee, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("chapa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [usePrepaid, setUsePrepaid] = useState(false);
  const [hasPrepaid, setHasPrepaid] = useState(false);
  const [prepaidBalance, setPrepaidBalance] = useState(0);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  const menuItemId = cart.length > 0 ? cart[0].menu_item_id : null;

  useEffect(() => {
    const checkPrepaidService = async () => {
      try {
        const response = await axios.get(
          `/api/prepaid/prepaid-status/${menuItemId}`
        );
        if (response.data.hasPrepaid) {
          setHasPrepaid(true);
          setPrepaidBalance(response.data.remainingBalance);
        }
      } catch (error) {
        console.error("Error checking prepaid service:", error);
      }
    };

    if (menuItemId) {
      checkPrepaidService();
    }
  }, [menuItemId]);

  useEffect(() => {
    if (cart.length === 0) {
      toast.info("Your cart is empty. Redirecting to homepage.");
      navigate("/homepage");
    }
  }, [cart, navigate]);

  const handlePlaceOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to place this order?"
    );
    if (!confirmed) return;

    setIsProcessing(true);

    const orderData = {
      items: cart,
      total,
      subtotal,
      shippingFee,
      deliveryNote,
      menuItemId,
      deliveryMethod,
      paymentMethod: usePrepaid ? "prepaid" : paymentMethod,
    };

    try {
      if (usePrepaid) {
        if (prepaidBalance >= total) {
          await axios.post("/api/prepaid/place-prepaid-order", orderData);
          toast.success("Order placed successfully using prepaid service!");
          clearCart();
          navigate("/homepage");
        } else {
          toast.error(
            "Insufficient prepaid balance. Please choose another payment method."
          );
        }
      } else if (paymentMethod === "cash") {
        await axios.post("/api/payment/cash-order", orderData);
        clearCart();
        toast.success(
          "Order placed successfully! Please pay with cash upon pickup."
        );
        navigate("/homepage");
      } else {
        const response = await axios.post("/api/payment/initiate", orderData);
        const { chapa_url } = response.data;
        navigate(chapa_url);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Failed to start payment. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const discountRate = 0.1;
  const discountedTotal = usePrepaid ? total - total * discountRate : total;
  const amountSaved = usePrepaid ? total * discountRate : 0;

  return (
    <div>
      <HeroSection
        title="Your Cart"
        subtitle="Review your items before checkout"
      />
      <div className="container py-5">
        <button
          onClick={() => navigate("/customer/cart")}
          className="btn btn-link text-decoration-none mb-4 p-0"
        >
          <i className="bi bi-arrow-left me-2"></i>
          <span>Back to Cart</span>
        </button>

        <h1 className="display-6 fw-bold mb-4">Checkout</h1>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow mb-4">
              <div className="card-body">
                <h2 className="h5 mb-3">Delivery Method</h2>

                <div className="d-flex gap-3 mb-3">
                  <label
                    className="flex-fill border rounded p-3 d-flex align-items-center cursor-pointer"
                    style={{
                      borderColor:
                        deliveryMethod === "pickup" ? "#1366B3" : "#dee2e6",
                    }}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === "pickup"}
                      onChange={() => setDeliveryMethod("pickup")}
                      className="form-check-input me-2"
                    />
                    Pickup from Lounge
                  </label>

                  <label
                    className="flex-fill border rounded p-3 d-flex align-items-center cursor-pointer"
                    style={{
                      borderColor:
                        deliveryMethod === "delivery" ? "#1366B3" : "#dee2e6",
                    }}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === "delivery"}
                      onChange={() => setDeliveryMethod("delivery")}
                      className="form-check-input me-2"
                    />
                    Deliver to Me
                  </label>
                </div>

                {deliveryMethod === "delivery" && (
                  <div>
                    <h2 className="h6 mb-2">Delivery Instructions</h2>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="e.g. Deliver to IT building lounge, near room 214."
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="card shadow mb-4">
              <div className="card-body">
                <h2 className="h5 mb-4">Payment Method</h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div
                      className={`card ${
                        paymentMethod === "chapa" ? "border-primary" : "border"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setPaymentMethod("chapa")}
                    >
                      <div className="card-body d-flex align-items-center p-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === "chapa"}
                            onChange={() => setPaymentMethod("chapa")}
                          />
                        </div>
                        <div className="ms-3">
                          <i className="bi bi-credit-card me-2"></i>
                          <span>Mobile Payment (Chapa)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className={`card ${
                        paymentMethod === "cash" ? "border-primary" : "border"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <div className="card-body d-flex align-items-center p-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === "cash"}
                            onChange={() => setPaymentMethod("cash")}
                          />
                        </div>
                        <div className="ms-3">
                          <i className="bi bi-cash me-2"></i>
                          <span>Cash</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {hasPrepaid && (
                  <div className="form-check mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="usePrepaid"
                      checked={usePrepaid}
                      onChange={(e) => setUsePrepaid(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="usePrepaid">
                      Use prepaid service (Balance: ${prepaidBalance.toFixed(2)}
                      )
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card shadow position-sticky"
              style={{ top: "5rem" }}
            >
              <div className="card-body">
                <h2 className="h5 mb-4">Order Summary</h2>

                <div
                  className="mb-4 overflow-auto"
                  style={{ maxHeight: "250px" }}
                >
                  {cart.map((item) => (
                    <div
                      key={item.menu_item_id}
                      className="d-flex align-items-center py-3 border-bottom"
                    >
                      <div className="flex-shrink-0 me-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ width: "50px" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-medium">{item.name}</p>
                        <p className="text-muted small mb-0">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="ms-3">
                        <p className="mb-0 fw-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Shipping</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  {usePrepaid ? (
                    <>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted text-decoration-line-through">
                          Total
                        </span>
                        <span className="text-decoration-line-through">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="fw-bold text-success">
                          Prepaid Discount Total
                        </span>
                        <span className="fw-bold text-success">
                          ${discountedTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">You saved</span>
                        <span className="text-muted">
                          -${amountSaved.toFixed(2)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <span className="text-muted small">Payment: </span>
                  <span className="fw-medium text-capitalize">
                    {usePrepaid ? "Prepaid Service" : paymentMethod}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-muted small">Delivery Note: </span>
                  <span className="fw-medium">
                    {deliveryNote || "No note provided"}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="btn btn-primary w-100 py-2"
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
