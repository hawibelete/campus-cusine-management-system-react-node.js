
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { totalItems, isLoading, openCart } = useCart();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accountMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAccountMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAccountMenuOpen(false);
  };

  const handleCartClick = () => {
    openCart();
    setTimeout(() => {
      navigate('/cart');
    }, 800);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Gourmet<span className="text-primary">Eats</span>
        </Link>

        <div className="d-none d-md-block mx-auto" style={{ width: "40%" }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search for dishes..."
            />
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown me-3" ref={accountMenuRef}>
            <button
              className="btn btn-light rounded-circle p-2"
              onClick={toggleAccountMenu}
              aria-label="Account"
              type="button"
            >
              <i className="bi bi-person fs-5"></i>
            </button>

            {isAccountMenuOpen && (
              <ul className="dropdown-menu dropdown-menu-end show shadow mt-2">
                {isLoggedIn ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      <span>Log out</span>
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={handleLogin}
                        className="dropdown-item d-flex align-items-center"
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        <span>Log in</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="dropdown-item d-flex align-items-center"
                      >
                        <i className="bi bi-person-plus me-2"></i>
                        <span>Sign up</span>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle p-2"
              onClick={handleCartClick}
              aria-label="Shopping Cart"
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <i className="bi bi-cart fs-5"></i>
              )}
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
