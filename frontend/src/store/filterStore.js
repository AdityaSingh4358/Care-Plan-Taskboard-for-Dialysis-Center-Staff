import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  role: 'all',
  timeFilter: 'all',
  setRole: (role) => set({ role }),
  setTimeFilter: (timeFilter) => set({ timeFilter }),
}))
