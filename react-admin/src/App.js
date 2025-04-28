import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DepartmentManager from './components/DepartmentManager';
import RoleManager from './components/RoleManager';
import LeaveRequestManager from './components/LeaveRequestManager';
import Dashboard from './pages/AdminDashboard';
import Navbar from './components/Sidebar';
import EmployeeManager from './components/EmployeeManager';
import Reports from './components/Reports';
import SalaryManager from './components/SalaryManager';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee" element={<EmployeeManager />} />
            <Route path="/departments" element={<DepartmentManager />} />
            <Route path="/roles" element={<RoleManager />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/salary" element={<SalaryManager />} />
            <Route path="/leave-requests" element={<LeaveRequestManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

