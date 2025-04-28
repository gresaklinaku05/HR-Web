// src/components/LeaveRequestManager.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getLeaveRequests, approveLeaveRequest, rejectLeaveRequest } from '../services/leaveService';

const LeaveRequestManager = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const data = await getLeaveRequests();
      setLeaveRequests(data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    try {
      await approveLeaveRequest(id);
      setLeaveRequests(prev =>
        prev.map((request) =>
          request.id === id ? { ...request, status: 'Approved' } : request
        )
      );
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeaveRequest(id);
      setLeaveRequests(prev =>
        prev.map((request) =>
          request.id === id ? { ...request, status: 'Rejected' } : request
        )
      );
    } catch (error) {
      console.error("Error rejecting leave request:", error);
    }
  };

  return (
    <div className="dashboard-container my-4">
      <h2 className="text-center mb-4">Menaxhimi i Kërkesave për Pushim</h2>

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
                  <th> Data e fillimit</th>
                  <th>Data e Mbarimit</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.length > 0 ? (
                  leaveRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.employeeName}</td>
                      <td>{request.startDate}</td>
                      <td>{request.endDate}</td>
                      <td>
                        <span className={`badge bg-${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="text-center">
                        {request.status === 'Pending' && (
                          <>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Mirato Kërkesën</Tooltip>}
                            >
                              <Button
                                variant="success"
                                size="sm"
                                className="me-2"
                                onClick={() => handleApprove(request.id)}
                              >
                                Mirato
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Refuzo kërkesën</Tooltip>}
                            >
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleReject(request.id)}
                              >
                                Refuzo
                              </Button>
                            </OverlayTrigger>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                    Nuk u gjet asnjë kërkesë për pushim.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

// Helper function for badge colors
const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'danger';
    case 'Pending':
    default:
      return 'warning';
  }
};

export default LeaveRequestManager;

