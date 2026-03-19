import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../api/endpoints'
import { useToastStore } from '../store/toastStore'

export const useUpdateTask = (patientId) => {
  const queryClient = useQueryClient()
  const setMessage = useToastStore.getState().setMessage

  return useMutation({
    mutationFn: ({ taskId, data }) => updateTask(taskId, data),

    onMutate: async ({ taskId, data }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', patientId] })
      const previous = queryClient.getQueryData(['tasks', patientId])

      queryClient.setQueryData(['tasks', patientId], (old = []) =>
        old.map(t => t._id === taskId ? { ...t, ...data } : t)
      )

      return { previous }
    },

    onError: (err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['tasks', patientId], context.previous)
      }
      setMessage(err.message || 'Failed to update task.')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', patientId] })
    },
  })
}
