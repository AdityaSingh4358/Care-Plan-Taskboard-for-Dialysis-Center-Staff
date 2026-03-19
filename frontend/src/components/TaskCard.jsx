import { useUpdateTask } from '../hooks/useUpdateTask'

const ROLE_COLORS = {
    nurse: '#3b82f6',
    dietician: '#10b981',
    social_worker: '#f59e0b',
}

const STATUS_COLORS = {
    overdue: '#ef4444',
    in_progress: '#f59e0b',
    completed: '#10b981',
}

export default function TaskCard({ task }) {
    const { title, role, assignee, dueDate, status, notes } = task ?? {}
    const { mutate } = useUpdateTask(task.patientId)

    const handleComplete = () => {
        if (!task?._id) return;
        mutate({ taskId: task._id, data: { status: 'completed' } })
    }

    return (
        <div style={{
            background: '#fff', borderRadius: 10, padding: '14px 16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 10,
            borderLeft: `4px solid ${STATUS_COLORS[status] ?? '#ccc'}`,
        }}>
            <p style={{ fontWeight: 600, margin: '0 0 6px', color: '#1e293b' }}>
                {title ?? 'Untitled Task'}
            </p>

            <span style={{
                background: ROLE_COLORS[role] ?? '#94a3b8', color: '#fff',
                padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600,
            }}>
                {role ?? 'unknown'}
            </span>

            <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
                {assignee && <p>👤 {assignee}</p>}
                {dueDate && <p>📅 {new Date(dueDate).toLocaleDateString()}</p>}
                {notes && <p style={{ fontStyle: 'italic' }}>{notes}</p>}
            </div>

            {status !== 'completed' && (
                <button onClick={handleComplete} style={{
                    marginTop: 12, width: '100%', background: '#10b981', color: '#fff',
                    border: 'none', padding: '6px 12px', borderRadius: 6,
                    cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    transition: 'all 0.2s ease'
                }}>
                    ✓ Mark Completed
                </button>
            )}
        </div>
    )
}


