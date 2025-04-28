// src/components/EmployeeManager.jsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Card, Spinner, Modal, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    const data = await getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employeeData.id) {
      await updateEmployee(employeeData);
    } else {
      await addEmployee(employeeData);
    }
    loadEmployees();
    setEmployeeData({
      name: '',
      email: '',
      department: '',
      role: '',
    });
  };

  const handleEdit = (employee) => {
    setEmployeeData({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (employeeToDelete) {
      await deleteEmployee(employeeToDelete.id);
      loadEmployees();
      setShowModal(false);
      setEmployeeToDelete(null);
    }
  };

  return (
    <div className="dashboard-container my-4">
      <h2 className="text-center mb-4">Menaxhimi i Puntoreve</h2>

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              {/* Form fields */}
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Emri</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="name"
                      value={employeeData.name}
                      onChange={handleChange}
                      placeholder="Shkruaj emrin e puntorit"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      name="email"
                      value={employeeData.email}
                      onChange={handleChange}
                      placeholder="Shkruaj emailin e puntorit"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="department">
                  <Form.Label>Departmenti</Form.Label>
                  <Form.Select
                    name="department"
                    value={employeeData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Zgjedh Departmentin</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={employeeData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Zgjedh Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col className="text-center mt-3">
                <Button 
                  variant={employeeData.id ? "warning" : "primary"} 
                  type="submit"
                  size="lg" 
                  className="px-5 py-2"
                  style={{ minWidth: '250px' }}
                >
                  {employeeData.id ? 'Përditëso Punëtorin' : 'Shto Punëtorin'}
                </Button>
              </Col>

            </Row>
          </Form>
        </Card.Body>
      </Card>

      <h4 className="mt-5 mb-3">Lista e Puntoreve</h4>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Card className="shadow-sm">
          <Table responsive striped bordered hover className="mb-0">
            <thead className="table-dark">
              <tr>
                <th>Emri</th>
                <th>Email</th>
                <th>Departmenti</th>
                <th>Role</th>
                <th className="text-center">Veprime</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.role}</td>
                    <td className="text-center">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Edit Puntori</Tooltip>}
                      >
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleEdit(employee)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete Puntori</Tooltip>}
                      >
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => confirmDelete(employee)}
                        >
                          Delete
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Nuk ka puntore të regjistruara.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Confirm Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
          Konfirmo Fshirjen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jeni i sigurt që dëshironi të fshini{' '}
          <strong>{employeeToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anulo
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeManager;
