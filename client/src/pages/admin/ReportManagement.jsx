import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "@/components/lounge-staff/LoadingSpinner";
import { fetchReportsForAllLounges } from "@/redux/slices/admin/reportsSlice";
import { fetchAllLounges } from "@/redux/slices/admin/loungeSlice";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

const ReportManagement = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const { report, loading, error } = useSelector((state) => state.adminReports);
  const { lounges } = useSelector((state) => state.lounges);

  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedLounge, setSelectedLounge] = useState("all");

  useEffect(() => {
    dispatch(fetchAllLounges());
    console.log("fetching lounges");
  }, [dispatch]);

  useEffect(() => {
    console.log("selectedLounge");
    console.log(selectedLounge);
    dispatch(fetchReportsForAllLounges(selectedLounge));
  }, [dispatch, selectedLounge]);
  console.log("report");
  console.log(report);
  const formatCurrency = (value) =>
    `ETB ${Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
console.log("report from the report page")
console.log(report)
  const parsedReport = {
    ...report,
    totalSales: Number(report.totalSales),
    averageOrderValue: Number(report.averageOrderValue),
    customerSatisfaction: Number(report.customerSatisfaction),
    totalOrders: Number(report.totalOrders),

    dailySales:
      report.dailySales?.map((item) => ({
        ...item,
        amount: Number(item.amount),
      })) || [],

    monthlySales:
      report.monthlySales?.map((item) => ({
        ...item,
        amount: Number(item.amount),
      })) || [],

    categorySales:
      report.categorySales?.map((item) => ({
        ...item,
        amount: Number(item.amount),
      })) || [],

    topSellingItems:
      report.topSellingItems?.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        revenue: Number(item.revenue),
      })) || [],

    revenueByLounge:
      report.revenueByLounge?.map((item) => ({
        ...item,
        revenue: Number(item.revenue),
      })) || [],

    demandByHour:
      report.demandByHour?.map((item) => ({
        ...item,
        orderCount: Number(item.orderCount),
      })) || [],
  };
  console.log("parsedReport");
  console.log(parsedReport);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Lounge Report & Analytics</h1>
        <div className="d-flex gap-3">
          <Form.Select
            value={selectedLounge}
            onChange={(e) => setSelectedLounge(e.target.value)}
          >
            <option value="all">All Lounges</option>
            {lounges.map((lounge) => (
              <option key={lounge.loungeId} value={lounge.loungeId}>
                {lounge.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="daily">Daily View</option>
            <option value="monthly">Monthly View</option>
          </Form.Select>
        </div>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100 border-primary text-center">
            <Card.Body>
              <h2 className="text-primary">
                {formatCurrency(parsedReport.totalSales)}
              </h2>
              <p className="text-muted mb-0">Total Sales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-primary text-center">
            <Card.Body>
              <h2 className="text-primary">
                {parsedReport.totalOrders?.toLocaleString()}
              </h2>
              <p className="text-muted mb-0">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-primary text-center">
            <Card.Body>
              <h2 className="text-primary">
                {formatCurrency(parsedReport.averageOrderValue)}
              </h2>
              <p className="text-muted mb-0">Avg. Order Value</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-primary text-center">
            <Card.Body>
              <h2 className="text-primary">
                {parsedReport.customerSatisfaction.toFixed(1)}/5
              </h2>
              <p className="text-muted mb-0">Customer Satisfaction</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header>
          <h3 className="h5 mb-0">
            Sales Trend (
            {timeRange === "daily" ? "Last 7 Days" : "Last 6 Months"})
          </h3>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={
                timeRange === "daily"
                  ? parsedReport.dailySales
                  : parsedReport.monthlySales
              }
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Sales by Category</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={parsedReport.categorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="amount"
                    nameKey="category"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {parsedReport.categorySales.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatCurrency} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Top Selling Items</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={parsedReport.topSellingItems}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) =>
                      name === "revenue" ? formatCurrency(value) : value
                    }
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="quantity"
                    fill="#8884d8"
                    name="Units Sold"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    fill="#82ca9d"
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedLounge === "all" && (
        <Card className="mb-4">
          <Card.Header>
            <h5>Total Revenue by Lounge</h5>
          </Card.Header>
          <Card.Body>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={parsedReport.revenueByLounge}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="loungeName" />
                <YAxis />
                <Tooltip formatter={formatCurrency} />
                <Legend />
                <Bar dataKey="revenue" fill="#00C49F" name="Total Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      )}

      {selectedLounge === "all" && (
      <Card className="mb-4">
        <Card.Header>
          <h5>Peak Demand Times (by Hour)</h5>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={parsedReport.demandByHour}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orderCount" fill="#FF8042" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
      )}

      <Card>
        <Card.Header>
          <h5>Financial Summary</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Card className="border-0 text-center">
                <Card.Body>
                  <div className="display-6">
                    {(
                      parsedReport.totalOrders /
                        parsedReport.monthlySales.length || 0
                    ).toFixed(0)}
                  </div>
                  <p>Avg Orders / Month</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 text-center">
                <Card.Body>
                  <div className="display-6">
                    {(
                      parsedReport.totalSales / parsedReport.totalOrders || 0
                    ).toFixed(2)}
                  </div>
                  <p>Revenue Per Order</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 text-center">
                <Card.Body>
                  <div className="display-6">
                    {formatCurrency(
                      parsedReport.monthlySales.at(-1)?.amount || 0
                    )}
                  </div>
                  <p>Current Month Revenue</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReportManagement;
