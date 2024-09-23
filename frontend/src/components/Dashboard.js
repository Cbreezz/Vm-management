import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import VMList from './VMList';
import BackupList from './BackupList';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      <div className="dashboard-content">
        <VMList />
        <BackupList />
      </div>
    </div>
  );
};

export default Dashboard;