import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUpdateTask } from '../hooks/useUpdateTask'
import { updateTask } from '../api/endpoints'
import React from 'react'

// 1. Mock the API endpoint module
vi.mock('../api/endpoints', () => ({
    updateTask: vi.fn()
}))

describe('useUpdateTask Optimistic Updates', () => {
    let queryClient;

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } }
        })
        vi.clearAllMocks()
    })

    const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    it('updates cache optimistically immediately on mutate', async () => {
        // Setup initial task cache
        queryClient.setQueryData(['tasks', '1'], [{ _id: 't1', title: 'Test', status: 'in_progress' }])

        const { result } = renderHook(() => useUpdateTask('1'), { wrapper })

        // Trigger mutation
        result.current.mutate({ taskId: 't1', data: { status: 'completed' } })

        // Check if optimistic update is applied to queryClient cache immediately
        const cached = queryClient.getQueryData(['tasks', '1'])
        expect(cached[0].status).toBe('completed')
    })

    it('rolls back cache data on Server Error', async () => {
        const initialTasks = [{ _id: 't1', title: 'Test', status: 'in_progress' }]
        queryClient.setQueryData(['tasks', '1'], initialTasks)

        // Force the API to throw an error
        vi.mocked(updateTask).mockRejectedValueOnce(new Error('Server Error'))

        const { result } = renderHook(() => useUpdateTask('1'), { wrapper })

        // Trigger mutation
        result.current.mutate({ taskId: 't1', data: { status: 'completed' } })

        // Wait for React Query to trigger the onError handler
        await waitFor(() => result.current.isError === true)

        // Verify that onMutate optimistic cache was successfully rolled back to starting state
        const cached = queryClient.getQueryData(['tasks', '1'])
        expect(cached[0].status).toBe('in_progress')
    })
})
