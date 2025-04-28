// src/components/Reports.jsx
import React, { useState, useEffect } from 'react';
import { Card, Table, Row, Col, Spinner } from 'react-bootstrap';
import { getEmployeeStatistics, getAttendanceReport, getLeaveReport, getPerformanceData } from '../services/reportService';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Reports = () => {
  const [employeeStats, setEmployeeStats] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      const stats = await getEmployeeStatistics();
      const attendance = await getAttendanceReport();
      const leave = await getLeaveReport();
      const performance = await getPerformanceData();

      setEmployeeStats(stats);
      setAttendanceData(attendance);
      setLeaveData(leave);
      setPerformanceData(performance);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="dashboard-container my-4">
      <h2 className="text-center mb-4">📊 Statistikat dhe Raportet</h2>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Raport për Punonjësit</Card.Title>
              <Table striped bordered hover responsive className="mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>Statusi</th>
                    <th>Numri</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total</td>
                    <td>{employeeStats.total ?? 0}</td>
                  </tr>
                  <tr>
                    <td>Aktivë</td>
                    <td>{employeeStats.active ?? 0}</td>
                  </tr>
                  <tr>
                    <td>Joaktivë</td>
                    <td>{employeeStats.inactive ?? 0}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Prezenca</Card.Title>
              <Doughnut
                data={{
                  labels: ['Ditë të Pranishme', 'Ditë të Munguar'],
                  datasets: [
                    {
                      label: 'Prezenca',
                      data: attendanceData,
                      backgroundColor: ['#28a745', '#dc3545'],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mt-3">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Pushimet</Card.Title>
              <Bar
                data={{
                  labels: ['Pushime të Paguara', 'Pushime të Paduara'],
                  datasets: [
                    {
                      label: 'Pushime',
                      data: leaveData,
                      backgroundColor: ['#ffc107', '#0d6efd'],
                      borderRadius: 5,
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Performanca e Punonjësve</Card.Title>
              <Line
                data={{
                  labels: Object.keys(performanceData),
                  datasets: [
                    {
                      label: 'Vlerësimi i Performancës',
                      data: Object.values(performanceData),
                      borderColor: '#6610f2',
                      backgroundColor: 'rgba(102, 16, 242, 0.2)',
                      tension: 0.3,
                      fill: true,
                      pointBackgroundColor: '#6610f2',
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
