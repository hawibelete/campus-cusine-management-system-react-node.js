import React, { useEffect, useState } from "react";
import axios from "@/utility/axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { CheckCircle, Lock, History } from "lucide-react";
import "./prepaid-service-registration-member.css";
import HeroSection from "@/components/shared/HeroSection";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useTranslation } from "react-i18next";

const PrepaidServiceMemberPage = () => {
  useAuthCheck();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [walletData, setWalletData] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get("/api/prepaid/wallet", {
          withCredentials: true,
        });
        console.log(response.data);
        setWalletData(response.data);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get("/api/prepaid/orders", {
          withCredentials: true,
        });
        const orders = response.data;

        if (orders.length === 0) {
          console.log("No recent orders found.");
        }

        setRecentOrders(orders);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchWalletData();
    fetchRecentOrders();
  }, []);

  const validateForm = () => {
    setAmountError("");

    if (!amount || amount <= 0 || isNaN(amount)) {
      setAmountError(t("prepaidServiceMember.amountError"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const res = await axios.post(
          "/api/payment/prepaid/initiate",
          {
            amount,
            loungeId: walletData.loungeId,
          },
          {
            withCredentials: true,
          }
        );

        if (res.data.chapa_url) {
          navigate(res.data.chapa_url);
        }
        setShowSuccess(true);
      } catch (err) {
        console.error("Payment initiation failed", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="prepaid-service-page">
      <HeroSection
        title={`${walletData.loungeName} ${t("prepaidServiceMember.loungeWalletDashboard")}`}
        subtitle={t("prepaidServiceMember.manageWalletSubtitle")}
      />

      <section>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="feature-content">
                <div className="wallet-card">
                  <div className="wallet-card-main">
                    <div className="wallet-label">{t("prepaidServiceMember.walletBalance")}</div>
                    <div className="wallet-balance-amount">
                      {walletData.balance} ETB
                    </div>

                    <div className="wallet-secondary-info">
                      <div className="wallet-expires">
                        <span>{t("prepaidServiceMember.numberOfOrders")}:</span>{" "}
                        {walletData.numberOfOrders
                          ? walletData.numberOfOrders
                          : t("prepaidServiceMember.noOrdersYet")}
                      </div>
                      <div className="wallet-last-transaction">
                        <span>{t("prepaidServiceMember.lastOrder")}:</span>{" "}
                        {walletData.lastOrder
                          ? new Date(walletData.lastOrder).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : t("prepaidServiceMember.noOrdersYet")}
                      </div>
                    </div>
                  </div>

                  <div className="wallet-summary-section">
                    <div className="wallet-summary-box">
                      <div className="summary-label">{t("prepaidServiceMember.totalDeposit")}</div>
                      <div className="summary-amount">
                        {walletData.totalDeposit} ETB
                      </div>
                    </div>

                    <div className="wallet-summary-box">
                      <div className="summary-label">{t("prepaidServiceMember.totalSpent")}</div>
                      <div className="summary-amount">
                        {walletData.totalSpent} ETB
                      </div>
                    </div>
                  </div>

                  <div className="section-header text-center mb-3 mt-4">
                    <h2 className="section-title">{t("prepaidServiceMember.topUpTitle")}</h2>
                    <p className="section-description">
                      {t("prepaidServiceMember.topUpDescription")}
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                      <Form.Label>{t("prepaidServiceMember.amountLabel")}</Form.Label>
                      <div className="d-flex align-items-center gap-3">
                        <Form.Control
                          type="number"
                          name="amount"
                          value={amount > 0 ? amount : ""}
                          onChange={(e) => {
                            setAmount(e.target.value);
                            setAmountError("");
                          }}
                          isInvalid={!!amountError}
                          placeholder={t("prepaidServiceMember.amountPlaceholder")}
                          min="1"
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          className="submit-button"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? t("prepaidServiceMember.processing")
                            : t("prepaidServiceMember.addMoney")}
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Control.Feedback type="invalid" className="d-block">
                      {amountError}
                    </Form.Control.Feedback>

                    {showSuccess && (
                      <Alert variant="success" className="success-alert">
                        <CheckCircle className="me-2" size={16} />
                        {t("prepaidServiceMember.paymentSuccess")}
                      </Alert>
                    )}
                    <div className="secure-payment-note">
                      <Lock size={14} /> {t("prepaidServiceMember.secureNote")}
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="transactionss-section">
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="glass-card">
                <div className="section-header">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h2 className="section-title">{t("prepaidServiceMember.orderHistory")}</h2>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="transaction-table">
                    <thead>
                      <tr>
                        <th>{t("prepaidServiceMember.order")}</th>
                        <th>{t("prepaidServiceMember.date")}</th>
                        <th>{t("prepaidServiceMember.amountColumn")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center text-muted py-4">
                            {t("prepaidServiceMember.noPrepaidOrders")}
                          </td>
                        </tr>
                      ) : (
                        recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>{order.date}</td>
                            <td className={`amount ${order.type}`}>
                              {order.type === "deposit" ? "+" : "-"}
                              {order.amount}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PrepaidServiceMemberPage;
