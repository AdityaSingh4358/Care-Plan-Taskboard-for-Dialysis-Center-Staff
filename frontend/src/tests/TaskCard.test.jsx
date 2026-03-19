import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TaskCard from '../components/TaskCard'

describe('TaskCard', () => {
  it('renders task title and role', () => {
    render(<TaskCard task={{
      _id: '1', title: 'Check blood pressure', role: 'nurse',
      assignee: 'Alice', dueDate: '2026-03-25', status: 'in_progress',
    }} />)
    expect(screen.getByText('Check blood pressure')).toBeTruthy()
    expect(screen.getByText('nurse')).toBeTruthy()
  })

  it('handles missing optional fields gracefully', () => {
    render(<TaskCard task={{ _id: '2', title: 'Simple Task', status: 'completed' }} />)
    expect(screen.getByText('Simple Task')).toBeTruthy()
  })

  it('shows "Untitled Task" when title is missing', () => {
    render(<TaskCard task={null} />)
    expect(screen.getByText('Untitled Task')).toBeTruthy()
  })
})
