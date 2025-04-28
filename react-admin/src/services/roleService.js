// src/services/roleService.js
import axios from 'axios';

const apiUrl = 'http://localhost:5163/api/roles'; // Përdorni URL-në e API-së tuaj

export const getRoles = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRole = async (role) => {
  try {
    const response = await axios.post(apiUrl, role);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRole = async (role) => {
  try {
    const response = await axios.put(`${apiUrl}/${role.id}`, role);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    throw error;
  }
};
