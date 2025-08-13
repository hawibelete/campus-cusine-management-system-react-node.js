
import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"; 

const DashboardCard = ({ title, icon, count, link, color }) => {
  const navigate = useNavigate();
  return (
    <Card className="mb-4 h-100" border={color}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>{title}</Card.Title>
            <Card.Text as="h2">{count}</Card.Text>
          </div>
            <div className={`text-secondary fs-1`}>
            {icon}
          </div>
        </div>
        <Button
        style={{ backgroundColor: "#E0F2F7" }}
          variant="link"
          className={`text-decoration-none p-2 mt-4`}
          onClick={() => navigate(link)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
