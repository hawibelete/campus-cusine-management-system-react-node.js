import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileAsync, toggleLikeAsync } from "@/redux/slices/customer/profileSlice";
import { useNavigate } from "react-router-dom";
import axios from '@/utility/axios';
import "./ProfilePage.css";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { user, favorites = [], isLoading } = useSelector((state) => state.profile);
  
    useEffect(() => {
      dispatch(fetchProfileAsync());
    }, [dispatch]);
  
    const handleLike = (itemId) => {
      dispatch(toggleLikeAsync(itemId));
    };
    console.log(user)
  
    const handleLogout = async () => {
      try {
        await axios.post("/api/logout", {}, { withCredentials: true });
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
  
    if (isLoading) return <p>Loading...</p>;

  return (
    <div className="profile-page mt-5">
      <div className="profile-header text-center py-5 bg-primary border-bottom">
        <img
          src="https://images.unsplash.com/photo-1607532941433-304659e8198a?w=150&h=150&fit=crop&crop=face"
          alt="Profile"
          className="avatar-img rounded-circle mb-1"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h3>Selam</h3>
        <p className="text-muted">Food lover | Customer since 2020</p>
        <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>
      </div>

      <Container className="my-5">
        <h4 className="mb-4">❤️ Favorite Dishes</h4>
        {favorites.length === 0 ? (
          <p>You haven’t added any favorites yet.</p>
        ) : (
          <Row>
            {favorites.map((item) => (
              <Col key={item.id} lg={4} md={6} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Img variant="top" src={item.image || "/placeholder.jpg"} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">{item.rating} ⭐</span>
                      <Button
                        size="sm"
                        onClick={() => handleLike(item.id)}
                      >
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
