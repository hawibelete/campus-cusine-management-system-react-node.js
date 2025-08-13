import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListCard from "@/components/customer/prepaid/ListCard";
import { Info } from "lucide-react";
import "./prepaid-service.css";
import HeroSection from "@/components/shared/HeroSection";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const PrepaidService = () => {
  useAuthCheck();
  const [loungeItems, setLoungeItems] = useState([]);

  useEffect(() => {
    const fetchLounges = async () => {
      try {
        const response = await fetch("/api/lounges/with-rating", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 401) {
          alert("Unauthorized! You do not have permission to access this.");
          throw new Error("Unauthorized access");
        } else if (response.status === 403) {
          alert("Forbidden! You are not allowed to perform this action.");
          throw new Error("Forbidden access");
        }

        if (!response.ok) throw new Error("Failed to fetch lounges");
        const lounges = await response.json();
        if (!lounges.message) {
          const data = lounges.map((lounge) => ({
            id: lounge.id,
            name: lounge.name,
            description: lounge.description,
            rating: lounge.rating,
            discountPercentage: lounge.discount_percentage,
          }));

          setLoungeItems(data); 
        }
      } catch (err) {
        console.error("Error fetching lounges:", err);
      }
    };

    fetchLounges();
  }, []);

  return (
    <div>
      <HeroSection
        title="Prepaid Service"
        subtitle="Exclusive benefits and discounts with the prepaid service"
      />

      <div className="prepaid-service-page mt-5">
        <section className="message-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="subscription-message glass-card">
                  <h4>
                    You are not currently subscribed prepaid service to any lounge
                  </h4>
                  <p className="message-description">
                    Subscribe to the prepaid service to enjoy exclusive
                    discounts and benefits
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="prepaid-lounges-section">
          <Container>
            <div>
              <Row className="justify-content-center">
                <Col lg={10}>
                  <div className="section-header mb-4">
                    <h2 className="section-title">Available Lounges</h2>
                  </div>
                </Col>
              </Row>

              <Row className="prepaid-lounge-list">
                {loungeItems.map((lounge) => (
                  <Col key={lounge.id} lg={4} md={12} className="mb-4">
                    <ListCard key={lounge.id} lounge={lounge} />
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </section>

        <section className="faq-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10} className="text-center mb-5">
                <h2 className="section-title">Frequently Asked Questions</h2>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="faq-container">
                  <div className="faq-item">
                    <div className="faq-question">
                      <Info className="faq-icon" size={16} />
                      <h4>What are the benefits of the prepaid service?</h4>
                    </div>
                    <div className="faq-answer">
                      <p>
                        The prepaid service offers exclusive discounts on the
                        lounges that give the service.
                      </p>
                    </div>
                  </div>

                  <div className="faq-item">
                    <div className="faq-question">
                      <Info className="faq-icon" size={16} />
                      <h4>How do I subscribe to the prepaid service?</h4>
                    </div>
                    <div className="faq-answer">
                      <p>
                        To subscribe, choose a lounge, complete the form, and
                        make the payment.
                      </p>
                    </div>
                  </div>

                  <div className="faq-item">
                    <div className="faq-question">
                      <Info className="faq-icon" size={16} />
                      <h4>
                        Is there a minimum subscription period or a time limit?
                      </h4>
                    </div>
                    <div className="faq-answer">
                      <p>
                        No, the prepaid service is flexible with no minimum
                        subscription period.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default PrepaidService;
