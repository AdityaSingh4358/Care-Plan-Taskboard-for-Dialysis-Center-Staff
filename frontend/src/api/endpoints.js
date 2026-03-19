import axiosClient from './axiosClient'

export const getPatients = () =>
  axiosClient.get('/patients').then(r => r.data.data)

export const getPatientTasks = (patientId) =>
  axiosClient.get(`/patients/${patientId}/tasks`).then(r => r.data.data)

export const createTask = (patientId, data) =>
  axiosClient.post(`/patients/${patientId}/tasks`, data).then(r => r.data.data)

export const updateTask = (taskId, data) =>
  axiosClient.patch(`/tasks/${taskId}`, data).then(r => r.data.data)
