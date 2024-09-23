import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home">
      <h1>Welcome to VM Management Platform</h1>
      {user ? (
        <>
          <p>Hello, {user.name}!</p>
          <Link to="/vm-management">Manage VMs</Link>
          <Link to="/backup-management">Manage Backups</Link>
          {user.role === 'admin' && <Link to="/admin-panel">Admin Panel</Link>}
        </>
      ) : (
        <>
          <p>Please log in to access the platform.</p>
          <Link to="/login">Log In</Link>
        </>
      )}
    </div>
  );
};

export default Home;