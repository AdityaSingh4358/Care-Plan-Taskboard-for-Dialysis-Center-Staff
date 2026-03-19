import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '../api/endpoints'

export const useCreateTask = (patientId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => createTask(patientId, data),

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', patientId] })
      const previous = queryClient.getQueryData(['tasks', patientId])

      queryClient.setQueryData(['tasks', patientId], (old = []) => [
        ...old,
        { ...newTask, _id: `temp-${Date.now()}`, status: 'in_progress' },
      ])

      return { previous }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['tasks', patientId], context.previous)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', patientId] })
    },
  })
}
