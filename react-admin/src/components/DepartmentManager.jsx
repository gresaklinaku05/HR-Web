// src/components/DepartmentManager.jsx
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/departmentService';

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [departmentData, setDepartmentData] = useState({ name: '', manager: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error loading departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (isEdit) {
        await updateDepartment(departmentData);
        setMessage({ type: 'success', text: 'Departamenti u përditësua me sukses!' });
      } else {
        await createDepartment(departmentData);
        setMessage({ type: 'success', text: 'Departamenti u krijua me sukses!' });
      }
      loadDepartments();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving department:', error);
      setMessage({ type: 'danger', text: 'Ndodhi një gabim gjatë ruajtjes së departamentit.' });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDepartment(selectedDepartmentId);
      setMessage({ type: 'success', text: 'Departamenti u fshi me sukses!' });
      loadDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
      setMessage({ type: 'danger', text: 'Ndodhi një gabim gjatë fshirjes së departamentit.' });
    } finally {
      setShowDeleteModal(false);
      setSelectedDepartmentId(null);
    }
  };

  const handleDelete = (id) => {
    setSelectedDepartmentId(id);
    setShowDeleteModal(true);
  };

  const handleModalShow = (department = null) => {
    if (department) {
      setIsEdit(true);
      setDepartmentData(department);
    } else {
      setIsEdit(false);
      setDepartmentData({ name: '', manager: '' });
    }
    setShowModal(true);
  };

  return (
    <div className="dashboard-container my-4">
      <h2 className="text-center mb-4">🏢 Menaxhimi i Departamenteve</h2>

      {message.text && (
        <Alert variant={message.type} onClose={() => setMessage({})} dismissible>
          {message.text}
        </Alert>
      )}

      <div className="text-end mb-3">
        <Button variant="primary" onClick={() => handleModalShow()}>
          Krijo Departament
        </Button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Emri</th>
              <th>Menaxheri</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  Nuk ka departamente të regjistruara.
                </td>
              </tr>
            ) : (
              departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.name}</td>
                  <td>{department.manager}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="warning" size="sm" onClick={() => handleModalShow(department)}>
                        Edito
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(department.id)}>
                        Fshi
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal për krijim/editim të departamentit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edito Departamentin' : 'Krijo Departament'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDepartmentName" className="mb-3">
              <Form.Label>Emri i Departamentit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shkruani emrin e departamentit"
                value={departmentData.name}
                onChange={(e) => setDepartmentData({ ...departmentData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDepartmentManager">
              <Form.Label>Emri i Menaxherit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shkruani emrin e menaxherit"
                value={departmentData.manager}
                onChange={(e) => setDepartmentData({ ...departmentData, manager: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anulo
          </Button>
          <Button variant="primary" onClick={handleCreateOrUpdate}>
            {isEdit ? 'Përditëso' : 'Krijo'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal për konfirmimin e fshirjes */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmo Fshirjen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jeni i sigurt që doni të fshini këtë departament?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Anulo
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Fshi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DepartmentManager;
