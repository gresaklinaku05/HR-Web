// src/components/SalaryManager.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Card, Modal, Spinner } from 'react-bootstrap';
import { getEmployees, updateSalary } from '../services/employeeService';

const SalaryManager = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newSalary, setNewSalary] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    setLoading(false);
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setNewSalary(employee.salary);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setNewSalary('');
  };

  const handleSalaryUpdate = async () => {
    try {
      await updateSalary(selectedEmployee.id, newSalary);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? { ...emp, salary: newSalary } : emp
        )
      );
      closeModal();
      alert('Paga u përditësua me sukses!');
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  return (
    <div className="dashboard-container my-4">
      <h2 className="text-center mb-4">Menaxhimi i pagave</h2>

      <Card className="shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table responsive striped bordered hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Emri i Punonjësit</th>
                  <th>Paga aktuale</th>
                  <th>Veprime</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.salary} Euro</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => openModal(emp)}
                        >
                          Përditëso pagën
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                    Nuk u gjet asnjë punonjës.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal për përditësimin e pagës */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Përditëso pagën</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Punonjësi: {selectedEmployee?.name}</Form.Label>
            <Form.Control
              type="number"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              min="0"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Anulo
          </Button>
          <Button variant="success" onClick={handleSalaryUpdate}>
          Ruaj Ndryshimet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SalaryManager;

