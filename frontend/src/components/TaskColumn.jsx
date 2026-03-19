import TaskCard from './TaskCard'

const COLUMN_LABELS = {
    overdue: ' Overdue',
    in_progress: ' In Progress',
    completed: ' Completed',
}

export default function TaskColumn({ status, tasks = [] }) {
    const filtered = tasks.filter(t => {
        const isCompleted = t.status === 'completed'
        
        const getTaskDateStr = (d) => d && d.includes('T') ? d.split('T')[0] : d
        const taskDate = getTaskDateStr(t.dueDate)
        const todayStr = new Date().toISOString().split('T')[0]

        const isOverdue = taskDate && taskDate < todayStr && !isCompleted

        if (status === 'overdue') return isOverdue
        if (status === 'completed') return isCompleted
        return !isCompleted && !isOverdue
    })

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
