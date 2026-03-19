import { useQuery } from '@tanstack/react-query'
import { getPatients } from '../api/endpoints'

export const usePatients = () =>
  useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
    retry: 3,
  })
