import { create } from 'zustand';
import { IResult } from '../types';

interface AssignmentState {
  currentJobId: string | null;
  currentResult: IResult | null;
  generationStatus: 'idle' | 'loading' | 'complete' | 'error';
  errorMessage: string | null;
  setJobId: (jobId: string) => void;
  setResult: (result: IResult) => void;
  setGenerationStatus: (status: 'idle' | 'loading' | 'complete' | 'error') => void;
  setError: (message: string) => void;
  reset: () => void;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
  currentJobId: null,
  currentResult: null,
  generationStatus: 'idle',
  errorMessage: null,
  setJobId: (jobId) => set({ currentJobId: jobId }),
  setResult: (result) => set({ currentResult: result }),
  setGenerationStatus: (status) => set({ generationStatus: status }),
  setError: (message) => set({ errorMessage: message }),
  reset: () => set({
    currentJobId: null,
    currentResult: null,
    generationStatus: 'idle',
    errorMessage: null,
  }),
}));