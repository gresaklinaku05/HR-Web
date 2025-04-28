// src/services/reportService.js
import axios from 'axios';

const apiUrl = 'http://localhost:5163/api/reports'; // Përdorni URL-në e API-së tuaj

// Merr statistikat për punonjësit
export const getEmployeeStatistics = async () => {
  try {
    const response = await axios.get(`${apiUrl}/employee-stats`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Merr raportin për prezencën
export const getAttendanceReport = async () => {
  try {
    const response = await axios.get(`${apiUrl}/attendance`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Merr raportin për pushimet
export const getLeaveReport = async () => {
  try {
    const response = await axios.get(`${apiUrl}/leave`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Merr të dhënat e performancës
export const getPerformanceData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/performance`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
