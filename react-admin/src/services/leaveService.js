// src/services/leaveService.js
import axios from 'axios';

const apiUrl = 'http://localhost:5163/api/leaverequests'; // Endpointi i API-së

// Merr kërkesat për pushim nga backend
export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Përditëson statusin e kërkesës për pushim
export const updateLeaveRequestStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${apiUrl}/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Aprovon kërkesën për pushim
export const approveLeaveRequest = async (id) => {
  return updateLeaveRequestStatus(id, 'Approved');
};

// Refuzon kërkesën për pushim
export const rejectLeaveRequest = async (id) => {
  return updateLeaveRequestStatus(id, 'Rejected');
};

// Fshin kërkesën për pushim
export const deleteLeaveRequest = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    throw error;
  }
};

