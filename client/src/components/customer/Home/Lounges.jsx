import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLounges } from "@/redux/slices/customer/loungesSlice";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 

const Lounges = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lounges, loading, error } = useSelector(
    (state) => state.customerLounges
  );

  const [favorited, setFavorited] = useState({});

  useEffect(() => {
    dispatch(fetchLounges());
  }, [dispatch]);

  const toggleFavorite = (id) => {
    setFavorited((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="d-flex align-items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={16}
            className="text-warning fill-warning"
          />
        ))}
        {hasHalfStar && (
          <div className="position-relative">
            <Star size={16} className="text-warning" />
            <div className="position-absolute top-0 start-0 overflow-hidden w-50">
              <Star size={16} className="text-warning fill-warning" />
            </div>
          </div>
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-warning" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-5 bg-light" id="lounges">
      <div className="container py-2">
        <div className="section-title text-center mb-5">
          <h2 className="display-6 fw-bold mb-4">{t('loungesTitle')}</h2> {/* Translated */}
        </div>

        {loading && <p className="text-center">{t('loadingLounges')}</p>} {/* Translated */}
        {error && <p className="text-center text-danger">{t('errorColon')} {error}</p>} {/* Translated */}

        <div className="row g-4">
          {lounges.map((lounge) => (
            <div key={lounge.id} className="col-md-4">
              <div className="card h-150 border-0 shadow-sm rounded-4 overflow-hidden transition">
                <div className="position-relative">
                  <button
                    onClick={() => toggleFavorite(lounge.id)}
                    className={`position-absolute top-3 end-3 z-3 p-2 rounded-circle bg-white bg-opacity-75 border-0
                      ${favorited[lounge.id] ? "text-danger" : "text-muted"}`}
                    style={{ zIndex: 10 }}
                  >
                    <Heart
                      size={18}
                      className={favorited[lounge.id] ? "fill-current" : ""}
                    />
                  </button>

                  <img
                    src={lounge.image || "https://placehold.co/400x300"}
                    alt={lounge.name}
                    className="img-fluid w-100 object-cover"
                    style={{ height: "300px" }}
                  />
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5 card-title mb-0">{lounge.name}</h3>
                    {renderStars(Number(lounge.rating))}
                  </div>
                  <p className="card-text text-muted mb-0">
                    {t('loungeDescription')} {/* Translated */}
                  </p>
                </div>

                <div className="card-footer bg-white border-0 pt-0">
                  <div className="d-grid">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate(`/customer/lounge/${lounge.id}`)}
                    >
                      {t('viewDetailsButton')} {/* Translated */}
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

export default Lounges;