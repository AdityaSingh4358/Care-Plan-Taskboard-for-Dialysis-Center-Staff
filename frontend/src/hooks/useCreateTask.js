import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '../api/endpoints'
import { useToastStore } from '../store/toastStore'

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const setMessage = useToastStore.getState().setMessage

  return useMutation({
    mutationFn: ({ patientId, ...data }) => createTask(patientId, data),

    onMutate: async ({ patientId, ...newTask }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', patientId] })
      const previous = queryClient.getQueryData(['tasks', patientId])

      queryClient.setQueryData(['tasks', patientId], (old = []) => [
        ...old,
        { ...newTask, _id: `temp-${Date.now()}`, status: 'in_progress' },
      ])

      return { previous, patientId }
    },

    onError: (err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['tasks', context.patientId], context.previous)
      }
      setMessage(err.message || 'Failed to create task.')
    },

    onSettled: (_data, _error, { patientId }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', patientId] })
    },
  })
}
