import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://localhost:5000/patients', () => {
        return HttpResponse.json({ success: true, data: [] })
    }),

    http.get('http://localhost:5000/patients/:id/tasks', () => {
        return HttpResponse.json({ success: true, data: [] })
    }),

    http.post('http://localhost:5000/patients/:id/tasks', () => {
        return HttpResponse.json({ success: true, data: {} }, { status: 201 })
    }),

    http.patch('http://localhost:5000/tasks/:id', () => {
        return HttpResponse.json({ success: true, data: {} })
    }),
]
