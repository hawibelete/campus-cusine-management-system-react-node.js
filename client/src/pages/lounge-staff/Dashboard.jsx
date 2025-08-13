import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "@/utility/axios";
import DashboardCard from "@/components/lounge-staff/DashboardCard";
import {
  ClipboardList,
  Sandwich,
  Utensils,
  FileText,
  Star,
  Wallet,
} from "lucide-react";
import { fetchOrders } from "@/redux/slices/lounge-staff/ordersSlice";
import { fetchMenuItems } from "@/redux/slices/lounge-staff/menuSlice";
import { fetchPrepaids } from "@/redux/slices/lounge-staff/prepaidSlice";
import { fetchFeedback } from "@/redux/slices/lounge-staff/feedbackSlice";
import { fetchReportsByLounge } from "@/redux/slices/lounge-staff/reportsSlice";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const Dashboard = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const [error, setAuthError] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const orders = useSelector((state) => state.orders.orders);
  const menuItems = useSelector((state) => state.menu.items);
  const prepaids = useSelector((state) => state.prepaids.users);
  const feedback = useSelector((state) => state.loungeFeedback);
  const reports = useSelector((state) => state.reports.report);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchMenuItems());
    dispatch(fetchPrepaids());
    dispatch(fetchFeedback());
    dispatch(fetchReportsByLounge());
  }, [dispatch]);

  console.log("from the dashboard page");
  console.log("Orders:", orders);
  console.log("feedback", feedback);
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;


  const todayOrders = orders.length;

  const lastMonthRevenue = (() => {
    if (
      reports &&
      Array.isArray(reports.monthlySales) &&
      reports.monthlySales.length > 0
    ) {
      const lastEntry = reports.monthlySales[reports.monthlySales.length - 1];
      const amount = Number(lastEntry?.amount);
      return isNaN(amount) ? 0 : amount;
    }
    return 0;
  })();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/check", { withCredentials: true });
        setAuthError(null);
      } catch (error) {
        setAuthError(error.response?.data?.message || "Authentication failed.");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (checkingAuth) return <p>Checking authorization...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container>
      <h1 className="mb-4">Lounge Dashboard</h1>
      <p className="text-muted">Welcome to your Lounge dashboard</p>
      <Row>
        <Col md={4}>
          <DashboardCard
            title="Pending Orders"
            icon={<ClipboardList size={32} />}
            count={pendingOrders}
            link="/lounge-staff/orders?filter=pending"
            color="secondary"
          />
        </Col>
        <Col md={4}>
          <DashboardCard
            title="All Orders"
            icon={<Sandwich size={32} />}
            count={todayOrders}
            link="/lounge-staff/orders?filter=all"
            color="secondary"
          />
        </Col>
        <Col md={4}>
          <DashboardCard
            title="Menu Items"
            icon={<Utensils size={32} />}
            count={menuItems.length}
            link="/lounge-staff/menu"
            color="secondary"
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={4}>
          <DashboardCard
            title="Service Prepaids"
            icon={<FileText size={32} />}
            count={prepaids.length}
            link="/lounge-staff/prepaids"
            color="secondary"
          />
        </Col>
        <Col md={4}>
          <DashboardCard
            title="Customer Feedback"
            icon={<Star size={32} />}
            count={feedback.feedback.length}
            link="/lounge-staff/feedback"
            color="secondary"
          />
        </Col>
        <Col md={4}>
          <DashboardCard
            title="Monthly Revenue"
            icon={<Wallet size={32} />}
            count={`$${lastMonthRevenue.toLocaleString()}`}
            link="/lounge-staff/reports"
            color="secondary"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
