import TaskCard from './TaskCard'

const COLUMN_LABELS = {
    overdue: ' Overdue',
    in_progress: ' In Progress',
    completed: ' Completed',
}

export default function TaskColumn({ status, tasks = [] }) {
    const filtered = tasks.filter(t => t.status === status)

    return (
        <div style={{
            flex: 1, background: '#f8fafc', borderRadius: 12, padding: 12,
            minHeight: 200,
        }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#475569' }}>
                {COLUMN_LABELS[status]} ({filtered.length})
            </h3>

            {filtered.length === 0
                ? <p style={{ color: '#94a3b8', fontSize: 12 }}>No tasks</p>
                : filtered.map(t => <TaskCard key={t._id} task={t} />)
            }
        </div>
    )
}
