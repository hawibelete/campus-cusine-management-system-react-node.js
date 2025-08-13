import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Coffee, MessageSquare, Users, BarChart3 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import DashboardCard from "@/components/lounge-staff/DashboardCard";
import { fetchAllLounges } from "@/redux/slices/admin/loungeSlice";
import { fetchUsers } from "@/redux/slices/admin/userSlice";
import { fetchFeedback } from "@/redux/slices/admin/feedbackSlice";
import { fetchReportsForAllLounges } from "@/redux/slices/admin/reportsSlice";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const AdminDashboard = () => {
  
  useAuthCheck();

  const dispatch = useDispatch();

  const { lounges: loungeItems = [] } = useSelector((state) => state.lounges);
  const { users: userItems = [] } = useSelector((state) => state.users);
  const { items: feedbackItems = [] } = useSelector(
    (state) => state.adminFeedback
  );

  const reportState = useSelector((state) => state.adminReports);
  const report = reportState?.report || {};
  const totalOrders = report.totalOrders || 0;
  const totalSales = report.totalSales || 0;

  useEffect(() => {
    dispatch(fetchAllLounges());
    dispatch(fetchUsers());
    dispatch(fetchFeedback());
    dispatch(fetchReportsForAllLounges("all"));
  }, [dispatch]);
  console.log("report");
  console.log(report);
  return (
    <Container>
      <h1 className="mb-4">Admin Dashboard</h1>
      <p className="text-muted">Welcome to your admin dashboard</p>
      <Row>
        <Col md={8} lg={4}>
          <DashboardCard
            title="Total Lounges"
            icon={<Coffee size={32} />}
            count={loungeItems.length}
            link="/admin/lounges"
            color="primary"
          />
        </Col>
        <Col md={8} lg={4}>
          <DashboardCard
            title="Registered Users"
            icon={<Users size={32} />}
            count={userItems.length}
            link="/admin/users"
            color="primary"
          />
        </Col>
        <Col md={8} lg={4}>
          <DashboardCard
            title="New Feedback"
            icon={<MessageSquare size={32} />}
            count={feedbackItems.length}
            link="/admin/feedback"
            color="primary"
          />
        </Col>
        </Row>
        <Row className="mt-5">
        <Col md={8} lg={4}>
          <DashboardCard
            title="Total Orders"
            icon={<BarChart3 size={32} />}
            count={totalOrders}
            link="/admin/reports"
            color="primary"
          />
        </Col>
        <Col md={8} lg={4}>
          <DashboardCard
            title="Total Sales"
            icon={<BarChart3 size={32} />}
            count={totalSales + " Birr"}
            link="/admin/reports"
            color="primary"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
