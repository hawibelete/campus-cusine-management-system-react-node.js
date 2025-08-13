import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import './hero-section.css';

const HeroSection = (props) => {
  return (
    <section className="hero-section mt-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={10}>
              <h1 className="hero-title">{props.title}</h1>
              <p className="hero-subtitle">{props.subtitle}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
