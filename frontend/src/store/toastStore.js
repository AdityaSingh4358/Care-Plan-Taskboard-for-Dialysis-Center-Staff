import { create } from 'zustand'

export const useToastStore = create((set) => ({
  message: '',
  setMessage: (message) => set({ message }),
  clearMessage: () => set({ message: '' }),
}))
