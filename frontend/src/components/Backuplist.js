import React, { useState, useEffect } from 'react';
import { getBackups, createBackup, deleteBackup } from '../services/api';

const BackupList = () => {
  const [backups, setBackups] = useState([]);
  const [newBackupName, setNewBackupName] = useState('');

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await getBackups();
      setBackups(response.data);
    } catch (error) {
      console.error('Error fetching backups:', error);
    }
  };

  const handleCreateBackup = async (e) => {
    e.preventDefault();
    try {
      await createBackup({ name: newBackupName });
      setNewBackupName('');
      fetchBackups();
    } catch (error) {
      console.error('Error creating backup:', error);
    }
  };

  const handleDeleteBackup = async (backupId) => {
    try {
      await deleteBackup(backupId);
      fetchBackups();
    } catch (error) {
      console.error('Error deleting backup:', error);
    }
  };

  return (
    <div className="backup-list">
      <h2>Backups</h2>
      <form onSubmit={handleCreateBackup}>
        <input
          type="text"
          value={newBackupName}
          onChange={(e) => setNewBackupName(e.target.value)}
          placeholder="New Backup Name"
          required
        />
        <button type="submit">Create Backup</button>
      </form>
      <ul>
        {backups.map((backup) => (
          <li key={backup.id}>
            {backup.name}
            <button onClick={() => handleDeleteBackup(backup.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BackupList;