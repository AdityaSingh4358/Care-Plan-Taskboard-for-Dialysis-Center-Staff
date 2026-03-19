import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TaskBoard from './components/TaskBoard'
import './App.css'
import ErrorToast from './components/ErrorToast'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, staleTime: 30_000 } }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <header style={{
          padding: '20px 32px', background: '#1e293b',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 24 }}>🏥</span>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            Dialysis Care Plan Taskboard
          </h1>
        </header>
        <main style={{ padding: '0 32px 40px' }}>
          <TaskBoard />
        </main>
        <ErrorToast />
      </div>
    </QueryClientProvider>
  )
}

export default App
