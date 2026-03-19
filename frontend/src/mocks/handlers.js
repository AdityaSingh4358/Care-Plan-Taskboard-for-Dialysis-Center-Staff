import { http, HttpResponse } from 'msw'

const localStorageKey = 'msw_mock_tasks';

// 1. Initial State loaded from localStorage, or hardcoded fallback
let mockTasks = [];
const storedTasks = localStorage.getItem(localStorageKey);

if (storedTasks) {
    try {
        mockTasks = JSON.parse(storedTasks);
    } catch (e) {
        console.error('Failed to parse stored mock tasks:', e);
    }
} else {
    mockTasks = [
        { _id: 't1', patientId: '1', title: 'Check Blood Pressure', status: 'in_progress', role: 'nurse', assignee: 'Alice', dueDate: new Date().toISOString() },
        { _id: 't2', patientId: '1', title: 'Review Diet Plan', status: 'overdue', role: 'dietician', assignee: 'Bob', dueDate: new Date().toISOString() }
    ];
    localStorage.setItem(localStorageKey, JSON.stringify(mockTasks));
}

// 2. Helper to save state back to LocalStorage
const saveState = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(mockTasks));
};

export const handlers = [

    // ✅ handle ALL preflight with CORS headers
    http.options('*', () => {
        return new HttpResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
    }),

    http.get('http://localhost:5000/patients', () => {
        return HttpResponse.json({
            success: true,
            data: [
                { _id: '1', name: 'John Doe', ward: 'A1', age: 45 },
                { _id: '2', name: 'Jane Smith', ward: 'B2', age: 60 }
            ]
        })
    }),

    http.get('http://localhost:5000/patients/:id/tasks', ({ params }) => {
        const tasks = mockTasks.filter(t => t.patientId === params.id);
        return HttpResponse.json({ success: true, data: tasks });
    }),

    http.post('http://localhost:5000/patients/:id/tasks', async ({ params, request }) => {
        const body = await request.json();
        const newTask = {
            ...body,
            _id: `t-${Date.now()}`,
            patientId: params.id,
            status: 'in_progress'
        };
        mockTasks.push(newTask);
        saveState(); // 💾 Save to localStorage
        return HttpResponse.json({ success: true, data: newTask }, { status: 201 });
    }),

    http.patch('http://localhost:5000/tasks/:id', async ({ params, request }) => {
        const body = await request.json();
        const index = mockTasks.findIndex(t => t._id === params.id);
        if (index > -1) {
            mockTasks[index] = { ...mockTasks[index], ...body };
            saveState(); // 💾 Save to localStorage
        }
        return HttpResponse.json({ success: true, data: mockTasks[index] || {} });
    }),
]
