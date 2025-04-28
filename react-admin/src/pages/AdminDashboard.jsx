import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { getDepartments } from '../services/departmentService';
import { getEmployees } from '../services/employeeService';
import { getLeaveRequests, approveLeaveRequest, rejectLeaveRequest } from '../services/leaveService';

const AdminDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [activeLeaves, setActiveLeaves] = useState(0);

  useEffect(() => {
    getDepartments().then((data) => setDepartments(data));
    getEmployees().then((data) => {
      setEmployees(data);
      setEmployeeCount(data.length);
    });
    getLeaveRequests().then((data) => {
      setLeaves(data);
      setActiveLeaves(data.filter(leave => leave.status === 'Active').length);
    });
  }, []);

  const attendanceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Prezenca',
        data: [10, 15, 13, 20, 18, 25],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="dashboard-container p-4">
      <h3 className="mb-4">Dashboard i Adminit</h3>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="text-white bg-primary shadow-sm">
            <Card.Body>
              <Card.Title className="mb-2">Numri i Punonjësve</Card.Title>
              <h2>{employeeCount}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-success shadow-sm">
            <Card.Body>
              <Card.Title className="mb-2">Pushime të Aktivizuara</Card.Title>
              <h2>{activeLeaves}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-warning shadow-sm">
            <Card.Body>
              <Card.Title className="mb-2">Prezenca Sot</Card.Title>
              <h2>75%</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Grafiku i Prezencës Mujore</Card.Title>
              <Line data={attendanceChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Departamentet</Card.Title>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Emri i Departamentit</th>
                    <th>Menaxheri</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td>{dept.name}</td>
                      <td>{dept.manager}</td>
                      <td>
                        <Button variant="outline-info" size="sm">
                          Edito
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Punonjësit</Card.Title>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Emri</th>
                    <th>Departamenti</th>
                    <th>Pagë</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.department}</td>
                      <td>
                        <Badge bg="light" text="dark">{emp.salary} Euro</Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm">
                          Detajet
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Kërkesat për Pushim</Card.Title>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Emri i Punonjësit</th>
                    <th>Data e Pushimit</th>
                    <th>Statusi</th>
                    <th>Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.employeeName}</td>
                      <td>{leave.leaveDate}</td>
                      <td>
                        <Badge bg={leave.status === 'Active' ? 'success' : 'secondary'}>
                          {leave.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => approveLeaveRequest(leave.id)}
                          >
                            Aprovoni
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => rejectLeaveRequest(leave.id)}
                          >
                            Refuzoni
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;


