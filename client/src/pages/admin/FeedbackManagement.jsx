import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "@/redux/slices/admin/feedbackSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const FeedbackManagement = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const {
    items: feedbackData,
    loading,
    error,
  } = useSelector((state) => state.adminFeedback);

  const [searchQuery, setSearchQuery] = useState("");
  const [loungeFilter, setLoungeFilter] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const loungeOptions = [
    ...new Set(
      feedbackData.map((item) =>
        JSON.stringify({ id: item.loungeId, name: item.loungeName })
      )
    ),
  ].map((str) => JSON.parse(str));

  const filteredFeedback = [...feedbackData]
    .filter((item) => {
      const matchesSearch =
        item.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.loungeName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLounge =
        loungeFilter === "all" || item.loungeId?.toString() === loungeFilter;

      const matchesRating =
        filterRating === "all" ||
        Number(item.rating) === parseInt(filterRating);

      return matchesSearch && matchesLounge && matchesRating;
    })
    .sort((a, b) => {
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
      .map((_, i) => (
        <span
          key={i}
          className={`text-${i < rating ? "warning" : "secondary"}`}
        >
          ★
        </span>
      ));
  };

  const renderRatingDistribution = () => {
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = feedbackData.filter(
        (item) => Number(item.rating) === stars
      ).length;
      const percentage =
        feedbackData.length > 0 ? (count / feedbackData.length) * 100 : 0;

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
                stars >= 4 ? "success" : stars === 3 ? "warning" : "danger"
              }`}
              role="progressbar"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Feedback Dashboard</h1>

      {/* Filters */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={loungeFilter}
            className="p-2"
            onChange={(e) => setLoungeFilter(e.target.value)}
          >
            <option value="all">All Lounges</option>
            {loungeOptions.map((lounge) => (
              <option key={lounge.id} value={lounge.id}>
                {lounge.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={filterRating}
            className="p-2"
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} {star === 1 ? "Star" : "Stars"}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={sortBy}
            className="p-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            variant="outline-secondary"
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="w-100 p-2"
          >
            {sortDirection === "asc" ? "↑ Asc" : "↓ Desc"}
          </Button>
        </Col>
      </Row>

      {/* Stats */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <h4>{feedbackData.length}</h4>
              <div className="text-muted">Total Feedback</div>
            </Col>
            <Col md={3} className="text-center">
              <h4>
                {feedbackData.length
                  ? (
                      feedbackData.reduce(
                        (sum, item) => sum + Number(item.rating),
                        0
                      ) / feedbackData.length
                    ).toFixed(1)
                  : "0.0"}
              </h4>
              <div className="text-muted">Average Rating</div>
            </Col>
            <Col md={3} className="text-center">
              <h4>
                {feedbackData.filter((item) => Number(item.rating) >= 4).length}
              </h4>
              <div className="text-muted">Positive Reviews</div>
            </Col>
            <Col md={3} className="text-center">
              <h4>
                {feedbackData.filter((item) => Number(item.rating) <= 2).length}
              </h4>
              <div className="text-muted">Negative Reviews</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Rating Distribution */}
      <Card className="mb-4">
        <Card.Header>Rating Distribution</Card.Header>
        <Card.Body>{renderRatingDistribution()}</Card.Body>
      </Card>

      {/* Feedback List */}
      {loading ? (
        <p className="text-center text-muted">Loading feedback...</p>
      ) : error ? (
        <div className="alert alert-danger text-center">Error: {error}</div>
      ) : filteredFeedback.length === 0 ? (
        <div className="alert alert-info text-center">
          No feedback found. Adjust filters or search.
        </div>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {filteredFeedback.map((item) => (
            <Col key={item.feedbackId}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="fs-5 mb-1">
                        {renderStars(Number(item.rating))}
                      </div>
                      <Card.Title>{item.customerName}</Card.Title>
                      <Card.Subtitle className="text-muted small">
                        {item.email}
                      </Card.Subtitle>
                    </div>
                  </div>
                  <p className="text-muted small mb-1">
                    Lounge: <strong>{item.loungeName}</strong>
                  </p>
                  <p>{item.message}</p>
                  <small className="text-muted">
                    Submitted on {new Date(item.date).toLocaleDateString()}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FeedbackManagement;
