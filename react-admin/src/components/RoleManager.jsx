// src/components/RoleManager.jsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Spinner, Modal, Alert, Row, Col } from 'react-bootstrap';
import { getRoles, createRole, updateRole, deleteRole } from '../services/roleService';

const RoleManager = () => {
  const [roles, setRoles] = useState([]);
  const [roleData, setRoleData] = useState({ name: '', privileges: '' });
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to load roles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (roleData.id) {
        await updateRole(roleData);
        setMessage({ type: 'success', text: 'Roli u përditësua me sukses!' });
      } else {
        await createRole(roleData);
        setMessage({ type: 'success', text: 'Roli u krijua me sukses!' });
      }
      loadRoles();
      setRoleData({ name: '', privileges: '' });
    } catch (error) {
      console.error('Failed to submit role:', error);
      setMessage({ type: 'danger', text: 'Ndodhi një gabim gjatë ruajtjes së rolit.' });
    }
  };

  const handleEdit = (role) => {
    setRoleData({
      id: role.id,
      name: role.name,
      privileges: role.privileges,
    });
    window.scrollTo(0, 0); // Scroll lart kur klikohet edit
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRole(selectedRoleId);
      setMessage({ type: 'success', text: 'Roli u fshi me sukses!' });
      loadRoles();
    } catch (error) {
      console.error('Failed to delete role:', error);
      setMessage({ type: 'danger', text: 'Ndodhi një gabim gjatë fshirjes së rolit.' });
    } finally {
      setShowDeleteModal(false);
      setSelectedRoleId(null);
    }
  };

  const handleDelete = (id) => {
    setSelectedRoleId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="dashboard-container my-4">
      <h2 className="text-center mb-4">Menaxhimi i Roleve</h2>

      {message.text && (
        <Alert variant={message.type} onClose={() => setMessage({})} dismissible>
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Emri i Rolës</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={roleData.name}
                onChange={handleChange}
                placeholder="P.sh. Administrator"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="privileges">
              <Form.Label>Privilegjet</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                name="privileges"
                value={roleData.privileges}
                onChange={handleChange}
                placeholder="P.sh. Krijo, Lexo, Përditëso, Fshi"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          {roleData.id ? 'Përditëso Rolin' : 'Krijo Rolin'}
        </Button>
      </Form>

      <h4 className="mt-5">Lista e Roleve</h4>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>Emri i Rolës</th>
              <th>Privilegjet</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  Nuk ka role të regjistruara.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.privileges}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="info" size="sm" onClick={() => handleEdit(role)}>
                        Edito
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(role.id)}>
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

      {/* Modal për konfirmimin e fshirjes */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmo Fshirjen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jeni i sigurt që doni të fshini këtë rol?</Modal.Body>
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

export default RoleManager;

