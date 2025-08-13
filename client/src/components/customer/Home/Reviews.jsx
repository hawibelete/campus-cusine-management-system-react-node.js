import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "@/redux/slices/admin/feedbackSlice";

const Reviews = () => {
  const dispatch = useDispatch();
  const {
    items: reviewsData,
    loading,
    error,
  } = useSelector((state) => state.adminFeedback);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedAvatars, setLoadedAvatars] = useState({});

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);
  useEffect(() => {
    if (!reviewsData || reviewsData.length === 0) return;

    const initialLoadState = {};
    reviewsData.forEach((review) => {
      initialLoadState[review.feedbackId] = false;
      const img = new Image();
      img.src = review.avatar;
      img.onload = () => {
        setLoadedAvatars((prev) => ({ ...prev, [review.feedbackId]: true }));
      };
    });
    setLoadedAvatars(initialLoadState);

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviewsData]);

  const renderStars = (rating) => (
    <div className="d-flex star-rating">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`me-1 ${i < rating ? "text-warning" : "text-secondary"}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );

  if (loading) {
    return (
      <section className="py-5 py-md-7 text-center" id="reviews">
        <div className="container">
          <p>Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 py-md-7 text-center" id="reviews">
        <div className="container">
          <p className="text-danger">Failed to load reviews: {error}</p>
        </div>
      </section>
    );
  }

  if (!reviewsData || reviewsData.length === 0) {
    return (
      <section className="py-5 py-md-7 text-center" id="reviews">
        <div className="container">
          <p className="text-muted">
            No reviews yet. Be the first to leave one!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 py-md-7" id="reviews">
      <div className="container-fluid">
        <div className="section-title text-center">
          <h2 className="display-6 fw-bold mb-5">Student Reviews</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="d-none d-md-block">
              <div className="row g-4">
                {reviewsData.slice(0, 4).map((review) => (
                  <div key={review.feedbackId} className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-start mb-3">
                          <div
                            className="rounded-circle overflow-hidden me-3 bg-light"
                            style={{ width: "48px", height: "48px" }}
                          >
                            {loadedAvatars[review.feedbackId] && (
                              <img
                                src={review.imageUrl}
                                alt={review.customerName}
                                className="w-100 h-100"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="fs-5 fw-semibold mb-1">
                              {review.customerName}
                            </h3>
                            <div className="d-flex align-items-center">
                              {renderStars(review.rating)}
                              <span className="ms-2 fs-xs text-muted">
                                {" "}
                                {new Date(review.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted mb-0">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-block d-md-none text-center">
              <div className="carousel slide" id="reviewsCarousel">
                <div className="carousel-inner">
                  {reviewsData.slice(0, 4).map((review, index) => (
                    <div
                      key={review.feedbackId}
                      className={`carousel-item ${
                        activeIndex === index ? "active" : ""
                      }`}
                    >
                      <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-start mb-3">
                            <div
                              className="rounded-circle overflow-hidden me-3 bg-light"
                              style={{ width: "48px", height: "48px" }}
                            >
                              {loadedAvatars[review.feedbackId] && (
                                <img
                                  src={review.imageUrl}
                                  alt={review.customerName}
                                  className="w-100 h-100"
                                />
                              )}
                            </div>
                            <div>
                              <h3 className="fs-5 fw-semibold mb-1">
                                {review.customerName}
                              </h3>
                              <div className="d-flex align-items-center">
                                {renderStars(review.rating)}
                                <span className="ms-2 fs-xs text-muted">
                                  {new Date(review.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted mb-0">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <p className="text-muted mb-4">
                Join thousands of happy students who are enjoying the Campus
                Bites experience.
              </p>
              <button className="btn btn-campus">Start Ordering</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
