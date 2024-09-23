import React, { useState, useEffect } from 'react';
import { getVMs, createVM, deleteVM } from '../services/api';

const VMList = () => {
  const [vms, setVMs] = useState([]);
  const [newVMName, setNewVMName] = useState('');

  useEffect(() => {
    fetchVMs();
  }, []);

  const fetchVMs = async () => {
    try {
      const response = await getVMs();
      setVMs(response.data);
    } catch (error) {
      console.error('Error fetching VMs:', error);
    }
  };

  const handleCreateVM = async (e) => {
    e.preventDefault();
    try {
      await createVM({ name: newVMName });
      setNewVMName('');
      fetchVMs();
    } catch (error) {
      console.error('Error creating VM:', error);
    }
  };

  const handleDeleteVM = async (vmId) => {
    try {
      await deleteVM(vmId);
      fetchVMs();
    } catch (error) {
      console.error('Error deleting VM:', error);
    }
  };

  return (
    <div className="vm-list">
      <h2>Virtual Machines</h2>
      <form onSubmit={handleCreateVM}>
        <input
          type="text"
          value={newVMName}
          onChange={(e) => setNewVMName(e.target.value)}
          placeholder="New VM Name"
          required
        />
        <button type="submit">Create VM</button>
      </form>
      <ul>
        {vms.map((vm) => (
          <li key={vm.id}>
            {vm.name}
            <button onClick={() => handleDeleteVM(vm.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VMList;