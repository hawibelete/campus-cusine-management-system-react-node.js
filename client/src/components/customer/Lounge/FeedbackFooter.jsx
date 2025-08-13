import React, { useState } from "react"; // Import useState
import { useSelector, useDispatch } from "react-redux";
import {
  setComment,
  submitFeedbackAsync,
  resetForm,
} from "@/redux/slices/customer/feedbackSlice";
import StarRating from "./StarRating";
import { toast } from "sonner";

const FeedbackFooter = () => {
  const dispatch = useDispatch();
  const { currentFeedback, isSubmitting } = useSelector(
    (state) => state.feedback
  );

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleCommentChange = (e) => {
    dispatch(setComment(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentFeedback.rating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }
    if (currentFeedback.comment.trim() === "") {
      toast.error("Please add a comment before submitting.");
      return;
    }

    const resultAction = await dispatch(submitFeedbackAsync()); 

    if (submitFeedbackAsync.fulfilled.match(resultAction)) {
      toast.success("Thank you for your feedback!");
      setFeedbackSubmitted(true); 
    } else {
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
    setFeedbackSubmitted(false); 
  };

  return (
    <footer className="bg-secondary.bg-gradient text-dark py-4 mt-auto">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-4">
              <h4 className="fw-bold mb-2">Share Your Experience</h4>
              <p className="mb-0">Your feedback helps us improve our service</p>
            </div>

            <div className="card bg-light border-secondary">
              <div className="card-body p-3">
                {feedbackSubmitted ? (
                  <div className="text-center py-5">
                    <i
                      className="bi bi-check-circle-fill text-success"
                      style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="mt-3 mb-2">
                      Thank you for your valuable feedback!
                    </h5>
                    <p className="text-muted">
                      We appreciate you taking the time to help us improve.
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-3"
                      onClick={handleReset}
                    >
                      Submit More Feedback
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <StarRating />

                    <div className="mb-4">
                      <textarea
                        id="comment"
                        className="form-control bg-light text-dark border-secondary"
                        rows="4"
                        placeholder="Share your thoughts, suggestions, or compliments..."
                        value={currentFeedback.comment}
                        onChange={handleCommentChange}
                        maxLength="500"
                        style={{ resize: "vertical" }}
                      ></textarea>
                      <small className="text-muted d-block mt-1">
                        {currentFeedback.comment.length}/500 characters
                      </small>
                    </div>

                    <div className="ms-1">
                      <button
                        type="submit"
                        className="btn btn-primary px-4 py-2 fw-medium"
                        disabled={isSubmitting || currentFeedback.rating === 0}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Submit Feedback
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-light px-4 py-2"
                        onClick={handleReset}
                        disabled={isSubmitting}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Clear Form
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FeedbackFooter;
