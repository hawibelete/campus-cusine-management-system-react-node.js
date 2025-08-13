import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/redux/slices/customer/notificationSlice";
import axios from "@/utility/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [localNotifications, setLocalNotifications] = useState([]);

  const cartQuantity = useSelector((state) => state?.cart?.totalQuantity || 0);
  const {
    data: notifications,
    loading,
    error,
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  useEffect(() => {
    if (notifications?.length) {
      setLocalNotifications(notifications);
    }
  }, [notifications]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const unreadCount = localNotifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNotificationClick = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  const handleReadNotification = (id, link, e) => {
    e.stopPropagation();

    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

    dispatch(markNotificationAsRead(id));
    setShowNotifications(false);

    if (link) navigate(link);
  };

  const markAllAsRead = (e) => {
    e.stopPropagation();

    setLocalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

    dispatch(markAllNotificationsAsRead());
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (showNotifications) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNotifications]);

  // const handleProfileClick = () => {
  //   navigate("/customer/profile");
  // };

  return (
    <header
      className={`fixed-top ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      } transition`}
    >
      <div className="container">
        <nav className="navbar navbar-expand-md py-3">
          <Link
            to="/homepage"
            className="navbar-brand d-flex align-items-center hover-text-primary"
          >
            <span className="fw-bold text-primary">CampusBites</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              isMobileMenuOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/homepage" className="nav-link hover-text-primary">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/customer/lounges"
                  className="nav-link hover-text-primary"
                >
                  Lounge
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/customer/prepaid"
                  className="nav-link hover-text-primary"
                >
                  Prepaid
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/customer/about"
                  className="nav-link hover-text-primary"
                >
                  About
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-light rounded-circle me-2"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>

              <Link
                to="/customer/cart"
                className="btn btn-light rounded-circle me-2 position-relative"
                aria-label="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {cartQuantity}
                  <span className="visually-hidden">items in cart</span>
                </span>
              </Link>
              <div
                className="position-relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="btn btn-light rounded-circle position-relative"
                  aria-label="Notifications"
                  onClick={handleNotificationClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {unreadCount}
                      <span className="visually-hidden">
                        unread notifications
                      </span>
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    className="position-absolute end-0 mt-2 py-2 bg-white shadow rounded-3 notifications-dropdown"
                    style={{
                      width: "320px",
                      maxHeight: "400px",
                      overflowY: "auto",
                      zIndex: 1050,
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                      <h6 className="mb-0 fw-bold">Notifications</h6>
                      {unreadCount > 0 && (
                        <button
                          className="btn btn-sm btn-link text-primary text-decoration-none p-0"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {loading ? (
                      <div className="p-3 text-center text-muted">
                        Loading...
                      </div>
                    ) : error ? (
                      <div className="p-3 text-center text-danger">
                        {error.message}
                      </div>
                    ) : localNotifications.length > 0 ? (
                      <div className="notification-list">
                        {localNotifications.map((notification) => (
                          <Link
                            key={notification.id}
                            to={notification.link}
                            className={`notification-item d-block px-3 py-2 text-decoration-none ${
                              !notification.isRead ? "bg-light" : ""
                            }`}
                            onClick={(e) =>
                              handleReadNotification(
                                notification.id,
                                notification.link,
                                e
                              )
                            }
                          >
                            <div className="d-flex align-items-start">
                              <div
                                className={`notification-indicator me-2 mt-1 ${
                                  !notification.isRead
                                    ? "bg-primary"
                                    : "bg-secondary"
                                }`}
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                              <div>
                                <h6 className="mb-0 text-dark">
                                  {notification.title}
                                </h6>
                                <p className="mb-0 small text-secondary">
                                  {notification.description}
                                </p>
                                <small className="text-muted">
                                  {new Date(
                                    notification.timestamp
                                  ).toLocaleString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: true,
                                  })}
                                </small>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 text-center text-muted">
                        <p className="mb-0">No notifications</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                className="btn btn-outline-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
