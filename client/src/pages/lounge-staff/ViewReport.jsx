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
import { fetchReportsByLounge } from "@/redux/slices/lounge-staff/reportsSlice";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

const ViewReport = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const { report, loading, error } = useSelector((state) => state.reports);
  const [timeRange, setTimeRange] = useState("daily");

  useEffect(() => {
    dispatch(fetchReportsByLounge());
  }, [dispatch]);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const parsedReport = {
    ...report,
    totalSales: Number(report.totalSales),
    averageOrderValue: Number(report.averageOrderValue),
    customerSatisfaction: Number(report.customerSatisfaction),
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
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Sales Report & Analytics</h1>
        <Form.Select
          className="w-auto"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="daily">Daily View</option>
          <option value="monthly">Monthly View</option>
        </Form.Select>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100 border-primary">
            <Card.Body className="text-center">
              <h2 className="text-primary">
                {formatCurrency(parsedReport.totalSales)}
              </h2>
              <p className="text-muted mb-0">Total Sales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-success">
            <Card.Body className="text-center">
              <h2 className="text-success">
                {parsedReport.totalOrders.toLocaleString()}
              </h2>
              <p className="text-muted mb-0">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-info">
            <Card.Body className="text-center">
              <h2 className="text-info">
                {formatCurrency(parsedReport.averageOrderValue)}
              </h2>
              <p className="text-muted mb-0">Average Order Value</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-warning">
            <Card.Body className="text-center">
              <h2 className="text-warning">
                {parsedReport.customerSatisfaction.toFixed(1)}/5.0
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
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  if (timeRange === "daily") {
                    return new Date(date).toLocaleDateString(undefined, {
                      month: "numeric",
                      day: "numeric",
                    });
                  } else {
                    return new Date(date + "-01").toLocaleDateString(
                      undefined,
                      { month: "short", year: "2-digit" }
                    );
                  }
                }}
              />
              <YAxis
                tickFormatter={(value) => `Br ${(value / 1000).toFixed(1)}k`}
              />

              <Tooltip
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(date) => {
                  if (timeRange === "daily") {
                    return new Date(date).toLocaleDateString();
                  } else {
                    return new Date(date + "-01").toLocaleDateString(
                      undefined,
                      { month: "long", year: "numeric" }
                    );
                  }
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="Sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <Card className="mb-4 h-100">
            <Card.Header>
              <h3 className="h5 mb-0">Sales by Category</h3>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={parsedReport.categorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="category"
                  >
                    {parsedReport.categorySales.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 h-100">
            <Card.Header>
              <h3 className="h5 mb-0">Top Selling Items</h3>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={parsedReport.topSellingItems}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "revenue") return formatCurrency(value);
                      return value;
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="quantity"
                    name="Units Sold"
                    fill="#8884d8"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    name="Revenue"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <h3 className="h5 mb-0">Performance Metrics</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Card className="border-0">
                <Card.Body className="text-center">
                  <div className="display-4">
                    {(
                      parsedReport.totalOrders /
                      parsedReport.monthlySales.length
                    ).toFixed(0)}
                  </div>
                  <p>Average Orders Per Month</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0">
                <Card.Body className="text-center">
                  <div className="display-4">
                    {(
                      parsedReport.totalSales / parsedReport.totalOrders
                    ).toFixed(2)}
                  </div>
                  <p>Revenue Per Order</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0">
                <Card.Body className="text-center">
                  <div className="display-4">
                    {formatCurrency(
                      parsedReport.monthlySales[
                        parsedReport.monthlySales.length - 1
                      ]?.amount || 0
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

export default ViewReport;
