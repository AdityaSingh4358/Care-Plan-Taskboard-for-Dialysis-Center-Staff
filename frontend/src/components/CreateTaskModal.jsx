import { useState } from 'react'
import { useCreateTask } from '../hooks/useCreateTask'

const ROLES = ['nurse', 'dietician', 'social_worker']
const TYPES = ['lab', 'medication', 'dietary', 'followup']

export default function CreateTaskModal({ patientId, onClose }) {
    const { mutate, isPending, isError } = useCreateTask(patientId)
    const [form, setForm] = useState({
        title: '', type: 'lab', role: 'nurse',
        assignee: '', dueDate: '', notes: '',
    })

    const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const submit = (e) => {
        e.preventDefault()
        mutate(form, { onSuccess: onClose })
    }

    return (
        <div style={overlay}>
            <div style={modal}>
                <h2 style={{ margin: '0 0 16px', color: '#1e293b' }}>New Task</h2>

                {isError && <p style={{ color: '#ef4444', marginBottom: 8 }}>Failed to create task.</p>}

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input name="title" placeholder="Title *" value={form.title}
                        onChange={handle} required style={inputStyle} />

                    <select name="type" value={form.type} onChange={handle} style={inputStyle}>
                        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    <select name="role" value={form.role} onChange={handle} style={inputStyle}>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>

                    <input name="assignee" placeholder="Assignee" value={form.assignee}
                        onChange={handle} style={inputStyle} />

                    <input name="dueDate" type="date" value={form.dueDate}
                        onChange={handle} style={inputStyle} />

                    <textarea name="notes" placeholder="Notes (optional)" value={form.notes}
                        onChange={handle} style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} />

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} style={cancelBtn}>Cancel</button>
                        <button type="submit" disabled={isPending} style={submitBtn}>
                            {isPending ? 'Saving…' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const overlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }
const modal = { background: '#fff', borderRadius: 14, padding: 28, width: 400, maxWidth: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }
const inputStyle = { padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, width: '100%', boxSizing: 'border-box' }
const submitBtn = { background: '#3b82f6', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }
const cancelBtn = { background: '#f1f5f9', color: '#475569', border: 'none', padding: '9px 16px', borderRadius: 8, cursor: 'pointer' }

