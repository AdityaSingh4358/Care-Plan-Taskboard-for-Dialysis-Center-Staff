import { useState } from 'react'
import { usePatients } from '../hooks/usepatients'
import { usePatientTasks } from '../hooks/usePatientTasks'
import { useFilterStore } from '../store/filterStore'
import TaskColumn from './TaskColumn'
import FilterBar from './FilterBar'
import CreateTaskModal from './CreateTaskModal'
import LoadingSkeleton from './LoadingSkeleton'

function PatientRow({ patient }) {
  const { data: tasks = [], isLoading } = usePatientTasks(patient._id)
  const { role, timeFilter } = useFilterStore()
  const [showModal, setShowModal] = useState(false)

  const isToday = (d) => new Date(d).toDateString() === new Date().toDateString()
  const isThisWeek = (d) => {
    const t = new Date(d), now = new Date()
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay())
    const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6)
    return t >= weekStart && t <= weekEnd
  }

  const filtered = tasks.filter(t => {
    const roleOk = role === 'all' || t.role === role
    const timeOk = timeFilter === 'all'
      || (timeFilter === 'today' && isToday(t.dueDate))
      || (timeFilter === 'week' && isThisWeek(t.dueDate))
    return roleOk && timeOk
  })

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>
          {patient.name ?? 'Unknown Patient'}
        </h2>
        <span style={{ color: '#64748b', fontSize: 13 }}>
          Ward {patient.ward} · Age {patient.age}
        </span>
        <button onClick={() => setShowModal(true)} style={{
          marginLeft: 'auto', background: '#3b82f6', color: '#fff',
          border: 'none', padding: '6px 14px', borderRadius: 8,
          cursor: 'pointer', fontWeight: 600, fontSize: 13,
        }}>
          + Add Task
        </button>
      </div>

      {isLoading
        ? <LoadingSkeleton />
        : (
          <div style={{ display: 'flex', gap: 12 }}>
            {['overdue', 'in_progress', 'completed'].map(s => (
              <TaskColumn key={s} status={s} tasks={filtered} />
            ))}
          </div>
        )
      }

      {showModal && (
        <CreateTaskModal patientId={patient._id} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default function TaskBoard() {
  const { data: patients = [], isLoading, isError } = usePatients()

  if (isLoading) return <LoadingSkeleton />
  if (isError) return <p style={{ color: '#ef4444' }}>Failed to load patients.</p>
  if (!patients.length) return <p style={{ color: '#94a3b8' }}>No patients found.</p>

  return (
    <div>
      <FilterBar />
      {patients.map(p => <PatientRow key={p._id} patient={p} />)}
    </div>
  )
}
