import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoungeById } from "@/redux/slices/customer/loungeProfileSlice";
import "./LoungeProfile.css";
import { useCart } from "@/context/CartContext";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import FeedbackFooter from "@/components/customer/Lounge/FeedbackFooter"; // Adjust the path as needed

function LoungeProfile() {
  useAuthCheck();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      dispatch(fetchLoungeById(id));
      window.scrollTo(0, 0);
    }
  }, [dispatch, id]);

  const { lounge, loading, error } = useSelector(
    (state) => state.loungeProfile
  );

  const [searchQuery, setSearchQuery] = React.useState("");

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!lounge)
    return (
      <div className="not-found">
        <h2>Lounge not found!</h2>
      </div>
    );

  return (
    <>
      {" "}
      {/* Use a React Fragment to wrap multiple top-level elements */}
      <div className="lounge-profile-container mt-5">
        <div className="banner-container">
          <img
            src={lounge.image_url}
            alt={`${lounge.name} Banner`}
            className="lounge-banner"
          />
          <div className="banner-overlay">
            <h1>{lounge.name}</h1>
            <p className="location">{lounge.location}</p>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="lounge-card">
            <div className="lounge-details">
              <div className="lounge-header">
                <h2>{lounge.name}</h2>
                <div className="rating">
                  {/* Conditional rendering for average rating */}
                  {lounge.feedbackCount > 0 && lounge.averageRating != null ? (
                    <>
                      ⭐ {parseFloat(lounge.averageRating).toFixed(1)} (
                      {lounge.feedbackCount} reviews)
                    </>
                  ) : (
                    <span>No reviews yet</span>
                  )}
                </div>
              </div>
              <p className="description">{lounge.description}</p>
              {lounge.provides_prepaid ? (
                <div className="prepaid-info">
                  <p>💳 Prepaid Service Available</p>
                  <p>
                    Minimum Top-Up: ETB 
                    {parseFloat(lounge.prepaidServiceInfo.minimumTopUp).toFixed(
                      2
                    )}
                  </p>
                  <p>
                    Discount: {lounge.prepaidServiceInfo.discountPercentage}%
                  </p>
                  <p>{lounge.prepaidServiceInfo.additionalInfo}</p>
                </div>
              ) : null}
              {lounge.provides_delivery ? (
                <p>🚚 Delivery Available</p>
              ) : (
                <p>🚫 No Delivery</p>
              )}
            </div>
          </div>

          {/* Conditional rendering for the menu section */}
          {lounge.menuItems && lounge.menuItems.length > 0 ? (
            <div className="menu-section">
              <h3>🍽️ Our Delicious Menu</h3>
              <div className="search-bar mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="menu-grid">
                {lounge.menuItems
                  .filter((item) => {
                    const name = item.name?.toLowerCase() || "";
                    const desc = item.description?.toLowerCase() || "";
                    return (
                      name.includes(searchQuery.toLowerCase()) ||
                      desc.includes(searchQuery.toLowerCase())
                    );
                  })
                  .map((item) => (
                    <div key={item.menu_item_id} className="menu-item-card">
                      <img
                        src={item.image_url || "https://placehold.co/200x150"}
                        alt={item.name}
                        className="menu-image"
                      />
                      <div className="menu-item-details">
                        <h4>{item.name}</h4>
                        <p className="item-description">{item.description}</p>
                        <div className="price-add">
                          <p className="menu-price">
                            ETB {parseFloat(item.price).toFixed(2)}
                          </p>
                          <button
                            onClick={() => addToCart(item)}
                            className="add-to-cart-btn"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="menu-section">
              <h3>🍽️ Our Delicious Menu</h3>
              <p className="no-menu-message">No menus yet.</p>
            </div>
          )}
        </div>
      </div>
      <FeedbackFooter />
    </>
  );
}

export default LoungeProfile;
