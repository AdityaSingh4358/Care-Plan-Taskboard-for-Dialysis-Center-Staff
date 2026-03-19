import { useFilterStore } from '../store/filterStore'
import { ROLES } from '../constants'

export default function FilterBar() {
    const { role, timeFilter, setRole, setTimeFilter } = useFilterStore()

    return (
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <select value={role} onChange={e => setRole(e.target.value)} style={selectStyle}>
                <option value="all">All Roles</option>
                {ROLES.map(r => (
                    <option key={r} value={r}>
                        {r.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </option>
                ))}
            </select>

            <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)} style={selectStyle}>
                <option value="all">All Time</option>
                <option value="today">Due Today</option>
                <option value="week">Due This Week</option>
            </select>
        </div>
    )
}

const selectStyle = {
    padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0',
    fontSize: 13, background: '#fff', cursor: 'pointer',
}
