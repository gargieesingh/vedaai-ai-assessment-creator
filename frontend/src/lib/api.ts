import axios from 'axios';
import { IAssignment, IResult } from '../types';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createAssignment = async (data: any) => {
  const response = await api.post('/assignments', data);
  return response.data;
};

export const generatePaper = async (assignmentId: string) => {
  const response = await api.post('/generate', { assignmentId });
  return response.data;
};

export const getResult = async (jobId: string) => {
  const response = await api.get(`/results/${jobId}`);
  return response.data;
};

export const getAssignments = async () => {
  const response = await api.get('/assignments');
  return response.data;
};

export const deleteAssignment = async (id: string) => {
  const response = await api.delete(`/assignments/${id}`);
  return response.data;
};