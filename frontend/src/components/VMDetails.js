import React, { useState, useEffect } from 'react';
import { getVM, updateVM } from '../services/api';

const VMDetails = ({ vmId }) => {
  const [vm, setVM] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    fetchVMDetails();
  }, [vmId]);

  const fetchVMDetails = async () => {
    try {
      const response = await getVM(vmId);
      setVM(response.data);
      setEditedName(response.data.name);
    } catch (error) {
      console.error('Error fetching VM details:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateVM(vmId, { name: editedName });
      setIsEditing(false);
      fetchVMDetails();
    } catch (error) {
      console.error('Error updating VM:', error);
    }
  };

  if (!vm) return <div>Loading...</div>;

  return (
    <div className="vm-details">
      <h2>VM Details</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Name: {vm.name}</p>
          <p>Status: {vm.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default VMDetails;