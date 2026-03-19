import { useQuery } from '@tanstack/react-query'
import { getPatientTasks } from '../api/endpoints'

export const usePatientTasks = (patientId) =>
  useQuery({
    queryKey: ['tasks', patientId],
    queryFn: () => getPatientTasks(patientId),
    enabled: !!patientId,
    retry: 3,
  })
