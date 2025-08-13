import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedback } from "@/redux/slices/lounge-staff/feedbackSlice";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";
import LoadingSpinner from "@/components/lounge-staff/LoadingSpinner";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const ViewFeedback = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const { feedback, loading, error } = useSelector((state) => state.loungeFeedback);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  let filteredFeedback = [...feedback];

  if (filterRating !== "all") {
    filteredFeedback = filteredFeedback.filter(
      (item) => item.rating === parseInt(filterRating)
    );
  }

  filteredFeedback.sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return sortDirection === "asc"
        ? a.rating - b.rating
        : b.rating - a.rating;
    }
  });

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`text-${index < rating ? "warning" : "secondary"}`}
        >
          ★
        </span>
      ));
  };

  const handleOpenModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const handleSendResponse = async () => {
    try {
      const res = await fetch("/api/notifications/respond", {
        method: "POST",
        credentials: 'include', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedFeedback.userId, 
          message: responseMessage,
          feedbackId: selectedFeedback.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to send response");

      setShowModal(false);
      setResponseMessage("");
      dispatch(fetchFeedback()); 
    } catch (err) {
      console.error(err);
      alert("Error sending response");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Customer Feedback</h1>
        <div className="d-flex gap-3">
          <Form.Select
            className="w-auto"
            value={filterRating.toString()}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </Form.Select>

          <Form.Select
            className="w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </Form.Select>

          <Button
            variant="outline-secondary"
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? "↑ Ascending" : "↓ Descending"}
          </Button>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <h2>{feedback.length}</h2>
              <p className="text-muted mb-0">Total Feedback</p>
            </Col>
            <Col md={3} className="text-center">
              <h2>
                {feedback.length > 0
                  ? (
                      feedback.reduce((sum, item) => sum + item.rating, 0) /
                      feedback.length
                    ).toFixed(1)
                  : "0.0"}
              </h2>
              <p className="text-muted mb-0">Average Rating</p>
            </Col>
            <Col md={3} className="text-center">
              <h2>{feedback.filter((item) => item.rating >= 4).length}</h2>
              <p className="text-muted mb-0">Positive Reviews</p>
            </Col>
            <Col md={3} className="text-center">
              <h2>{feedback.filter((item) => item.rating <= 2).length}</h2>
              <p className="text-muted mb-0">Negative Reviews</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Rating Distribution</Card.Header>
        <Card.Body>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = feedback.filter(
              (item) => item.rating === stars
            ).length;
            const percentage =
              feedback.length > 0 ? (count / feedback.length) * 100 : 0;

            return (
              <div key={stars} className="mb-2">
                <div className="d-flex justify-content-between mb-1">
                  <span>
                    {stars} {stars === 1 ? "Star" : "Stars"}
                  </span>
                  <span>
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="progress">
                  <div
                    className={`progress-bar bg-${
                      stars >= 4
                        ? "success"
                        : stars === 3
                        ? "warning"
                        : "danger"
                    }`}
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </Card.Body>
      </Card>

      {filteredFeedback.length === 0 ? (
        <div className="alert alert-info">
          No feedback found with the selected filters.
        </div>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {filteredFeedback.map((item) => (
            <Col key={item.id}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fs-5 mb-1">
                        {renderStars(item.rating)}
                      </div>
                      <Card.Title>{item.customerName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {new Date(item.date).toLocaleDateString()}
                      </Card.Subtitle>
                    </div>
                    <div>
                      {item.responded ? (
                        <Badge bg="success">Responded</Badge>
                      ) : (
                        <Badge bg="warning">Pending</Badge>
                      )}
                    </div>
                  </div>
                  <Card.Text>{item.comment}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleOpenModal(item)}
                      disabled={item.responded}
                    >
                      {item.responded ? "Response Sent" : "Send Response"}
                    </Button>
                    {item.responded && (
                      <span className="text-success fw-semibold align-self-center">
                        Responded
                      </span>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Respond to Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="responseMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendResponse}>
            Send Response
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewFeedback;
