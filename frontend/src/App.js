import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import VMManagement from './pages/VMManagement';
import BackupManagement from './pages/BackupManagement';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vm-management" element={<VMManagement />} />
            <Route path="/backup-management" element={<BackupManagement />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;