// src/services/departmentService.js
import axios from 'axios';

const apiUrl = 'http://localhost:5163/api/departments'; // Endpointi për departamentet

export const getDepartments = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDepartment = async (departmentData) => {
  try {
    const response = await axios.post(apiUrl, departmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDepartment = async (departmentData) => {
  try {
    const response = await axios.put(`${apiUrl}/${departmentData.id}`, departmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    throw error;
  }
};
