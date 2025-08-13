import React from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/shared/HeroSection";
import { useAuthCheck } from "@/hooks/useAuthCheck";
const CartPage = () => {
  useAuthCheck();
  const { cart, removeFromCart, updateQuantity, subtotal, shippingFee, total } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/customer/checkout");
  };

  if (cart.length === 0) {
    console.log("cart");
    console.log(cart);
    return (
      <div>
        <HeroSection
          title="Your Cart"
          subtitle="Review your items before checkout"
        />
        <div className="container py-5 text-center">
          <div className="card shadow p-5 my-5">
            <div className="d-flex flex-column align-items-center">
              <div className="bg-light p-4 rounded-circle mb-4">
                <i className="bi bi-cart fs-1 text-secondary"></i>
              </div>
              <h2 className="h4 mb-3">Your cart is empty</h2>
              <p className="text-muted mb-4">
                Add some delicious items to get started
              </p>
              <button
                onClick={() => navigate("/homepage")}
                className="btn btn-primary px-4 py-2"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        title="Your Cart"
        subtitle="Review your items before checkout"
      />
      <div className="container py-5">
        <h1 className="display-6 fw-bold mb-4">Your Cart</h1>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body p-0">
                {cart.map((item) => (
                  <div key={item.menu_item_id} className="border-bottom p-4">
                    <div className="row align-items-center">
                      <div className="col-md-2 mb-3 mb-md-0">
                        <img
                          src={
                            item.image ||
                            "https://placehold.co/200x150?text=No+Image"
                          }
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </div>

                      <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="text-muted mb-0">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      <div className="col-md-3 mb-3 mb-md-0">
                        <div className="input-group">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.menu_item_id,
                                item.quantity - 1
                              )
                            }
                            className="btn btn-outline-secondary"
                            disabled={item.quantity <= 1}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.menu_item_id,
                                item.quantity + 1
                              )
                            }
                            className="btn btn-outline-secondary"
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>

                      <div className="col-md-2 text-md-end mb-3 mb-md-0">
                        <span className="fw-bold">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="col-md-1 text-end">
                        <button
                          onClick={() => removeFromCart(item.menu_item_id)}
                          className="btn btn-sm btn-link text-danger p-0"
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn btn-primary w-100 py-2"
                >
                  Place Order <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
