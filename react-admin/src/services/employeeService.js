// src/services/employeeService.js
import axios from 'axios';

const apiUrl = 'http://localhost:5163/api/employees'; // Përdorni URL-në e API-së tuaj

export const getEmployees = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(apiUrl, employee);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (employee) => {
  try {
    const response = await axios.put(`${apiUrl}/${employee.id}`, employee);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    throw error;
  }
};


// Përditëson pagën e punonjësit
export const updateSalary = async (id, salary) => {
  try {
    const response = await axios.patch(`${apiUrl}/${id}`, { salary });
    return response.data;
  } catch (error) {
    throw error;
  }
};