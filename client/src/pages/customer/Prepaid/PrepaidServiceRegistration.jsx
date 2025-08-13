import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { CheckCircle, Lock, Info, FileCheck } from "lucide-react";
import "./prepaid-service-registration-member.css";
import HeroSection from "@/components/shared/HeroSection";
import { useTranslation } from "react-i18next";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const PrepaidServiceRegistration = () => {
  useAuthCheck();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    phone: "",
    amount: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const amountOptions = [100, 250, 500, 1000, 1500, 2000];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setFormData({
      ...formData,
      amount: amount,
    });

    if (errors.amount) {
      setErrors({
        ...errors,
        amount: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Fname.trim()) {
      newErrors.Fname = "First name is required";
    }

    if (!formData.Lname.trim()) {
      newErrors.Lname = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.amount) {
      newErrors.amount = "Please select or enter an amount";
    } else if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the Terms and Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);

        setFormData({
          Fname: "",
          Lname: "",
          email: "",
          phone: "",
          amount: "",
          terms: false,
        });
        setSelectedAmount(null);
      }, 1500);
    }
  };

  return (
    <div className="prepaid-service-page">
      <HeroSection
        title="LKe Lounge Prepaid Wallet"
        subtitle="Seamless ordering experience with the prepaid wallet service"
      />

      <section className="features-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="glass-card">
                <div className="feature-content">
                  <h2 className="section-title">{t("dining.title")}</h2>
                  <p className="section-description">
                    {t("dining.description")}
                  </p>

                  <ul className="feature-list">
                    <div className="mb-3">
                      <CheckCircle className="feature-icon" size={16} />
                      {t("dining.features.exclusive")}
                    </div>

                    <div className="mb-3">
                      <CheckCircle className="feature-icon" size={16} />
                      {t("dining.features.automatic")}
                    </div>

                    <div className="mb-3">
                      <CheckCircle className="feature-icon" size={16} />
                      {t("dining.features.secure")}
                    </div>

                    <div className="mb-3">
                      {" "}
                      <CheckCircle className="feature-icon" size={16} />
                      {t("dining.features.promotions")}
                    </div>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="form-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="form-wrapper">
                <div className="section-header text-center mb-5">
                  <h2 className="section-title">{t("topup.title")}</h2>
                  <p className="section-description">
                    {t("topup.description")}
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="form-group">
                        <Form.Label>{t("topup.firstName")}</Form.Label>
                        <Form.Control
                          type="text"
                          name="Fname"
                          value={formData.Fname}
                          onChange={handleChange}
                          isInvalid={!!errors.Fname}
                          placeholder={t("topup.firstNamePlaceholder")}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.Fname}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="form-group">
                        <Form.Label>{t("topup.lastName")}</Form.Label>
                        <Form.Control
                          type="text"
                          name="Lname"
                          value={formData.Lname}
                          onChange={handleChange}
                          isInvalid={!!errors.Lname}
                          placeholder={t("topup.lastNamePlaceholder")}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.Lname}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="form-group">
                        <Form.Label>{t("topup.phone")}</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                          placeholder={t("topup.phonePlaceholder")}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="form-group">
                        <Form.Label>{t("topup.email")}</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          placeholder={t("topup.emailPlaceholder")}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="form-group">
                    <Form.Label>{t("topup.selectAmount")}</Form.Label>
                    <div className="amount-options">
                      {amountOptions.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={
                            selectedAmount === amount
                              ? "primary"
                              : "outline-primary"
                          }
                          className="amount-button"
                          onClick={() => handleAmountSelect(amount)}
                        >
                          {amount} ETB
                        </Button>
                      ))}
                    </div>

                    <div className="custom-amount-wrapper">
                      <Form.Label>{t("topup.customAmount")}</Form.Label>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={(e) => {
                          handleChange(e);
                          setSelectedAmount(null);
                        }}
                        isInvalid={!!errors.amount}
                        placeholder={t("topup.customAmountPlaceholder")}
                        min="1"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.amount}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <div className="d-flex align-items-center gap-3 mt-3">
                    <Form.Group className="form-group terms-group">
                      <Form.Check
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        label={
                          <span className="text-nowrap">
                            {t("topup.agree")}{" "}
                            <a href="#terms" className="terms-link">
                              {t("topup.terms")} <FileCheck size={14} />
                            </a>
                          </span>
                        }
                      />
                    </Form.Group>

                    <div className="form-action">
                      <Button
                        type="submit"
                        variant="primary"
                        className="submit-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t("topup.processing") : t("topup.pay")}
                      </Button>
                    </div>
                  </div>

                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.terms}
                  </Form.Control.Feedback>

                  {showSuccess && (
                    <Alert variant="success" className="success-alert">
                      <CheckCircle className="me-2" size={16} />
                      {t("topup.success")}
                    </Alert>
                  )}

                  <div className="secure-payment-note">
                    <Lock size={14} /> {t("topup.secureNote")}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="faq-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="text-center mb-3">
              <h2 className="section-title">{t("faq.title")}</h2>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="faq-container">
                <div className="faq-item">
                  <div className="faq-question">
                    <Info className="faq-icon" size={16} />
                    <h4>{t("faq.q1.question")}</h4>
                  </div>
                  <div className="faq-answer">
                    <p>{t("faq.q1.answer")}</p>
                  </div>
                </div>

                <div className="faq-item">
                  <div className="faq-question">
                    <Info className="faq-icon" size={16} />
                    <h4>{t("faq.q2.question")}</h4>
                  </div>
                  <div className="faq-answer">
                    <p>{t("faq.q2.answer")}</p>
                  </div>
                </div>

                <div className="faq-item">
                  <div className="faq-question">
                    <Info className="faq-icon" size={16} />
                    <h4>{t("faq.q3.question")}</h4>
                  </div>
                  <div className="faq-answer">
                    <p>{t("faq.q3.answer")}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PrepaidServiceRegistration;
