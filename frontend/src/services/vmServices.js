import api from './api';

export const getVMs = () => api.get('/vms');

export const getVM = (id) => api.get(`/vms/${id}`);

export const createVM = (vmData) => api.post('/vms', vmData);

export const updateVM = (id, vmData) => api.put(`/vms/${id}`, vmData);

export const deleteVM = (id) => api.delete(`/vms/${id}`);

export const startVM = (id) => api.post(`/vms/${id}/start`);

export const stopVM = (id) => api.post(`/vms/${id}/stop`);

export const restartVM = (id) => api.post(`/vms/${id}/restart`);

export const createBackup = (id, backupData) => api.post(`/vms/${id}/backups`, backupData);

export const restoreBackup = (vmId, backupId) => api.post(`/vms/${vmId}/backups/${backupId}/restore`);