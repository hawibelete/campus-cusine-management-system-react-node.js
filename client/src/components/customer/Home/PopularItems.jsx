import { useState, useEffect } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import axios from '@/utility/axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const PopularItems = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [loadedImages, setLoadedImages] = useState({});
  const [popularItems, setPopularItems] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await axios.get('/api/menus/popular-items');
        const data = response.data;
        setPopularItems(data);

        const initialLoadState = data.reduce((acc, item) => {
          acc[item.menu_item_id] = false;
          return acc;
        }, {});
        setLoadedImages(initialLoadState);

        data.forEach(item => {
          const img = new Image();
          img.src = item.image;
          img.onload = () => {
            setLoadedImages(prev => ({
              ...prev,
              [item.menu_item_id]: true
            }));
          };
        });
      } catch (error) {
        console.error('Failed to fetch popular items:', error); // This console log might also benefit from i18n in a real app
      }
    };

    fetchPopularItems();
  }, []);


  // However, there are no translatable strings in this specific useEffect, so no changes are applied here.
  useEffect(() => {
    const initialLoadState = popularItems.reduce((acc, item) => {
      acc[item.menu_item_id] = false;
      return acc;
    }, {});

    setLoadedImages(initialLoadState);

    popularItems.forEach(item => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [item.menu_item_id]: true
        }));
      };
    });
  }, [popularItems]);


  const renderStars = (rating) => {
    const fullStars = Math.floor(Number(rating) || 0);
    const hasHalfStar = Number(rating) % 1 !== 0;

    return (
      <div className="d-flex star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="star filled" size={18} />
        ))}

        {hasHalfStar && (
          <div className="position-relative">
            <Star className="star half-filled" size={18} />
          </div>
        )}

        {[...Array(5 - Math.ceil(Number(rating) || 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="star" size={18} />
        ))}
      </div>
    );
  };

  return (
    <section className="py-5 py-md-7" id="popular-items">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="display-6 fw-bold">{t('popularItemsTitle')}</h2>
        </div>

        <div className="row g-4">
          {popularItems.map((item) => (
            <div key={item.menu_item_id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 card-hover overflow-hidden">
                <div className="position-relative">
                  <div className="position-absolute top-0 start-0 m-2 z-3 px-2 py-1 rounded bg-white bg-opacity-75">
                    {renderStars(item.rating)}
                  </div>

                  <div className="position-relative" style={{ height: "200px" }}>
                    {!loadedImages[item.menu_item_id] && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-light placeholder-glow"></div>
                    )}

                    <img
                      src={item.image}
                      alt={item.name} 
                      className={`w-100 h-100 object-fit-cover ${loadedImages[item.menu_item_id] ? 'img-loaded' : 'img-loading'}`}
                    />

                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-dark to-transparent opacity-25"></div>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="fs-5 fw-semibold">{item.name}</h3> 

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-campus fw-bold">{item.price} {t('currencyUnit')}</span>

                    <button
                      onClick={() => addToCart(item)}
                      className="btn btn-sm btn-campus add-to-cart-btn d-flex align-items-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      {t('addToCartButton')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItems;