import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }
}

const root = createRoot(document.getElementById('root'))

enableMocking()
  .then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  })
  .catch((err) => {
    root.render(
      <div style={{ padding: 20, color: 'red', fontFamily: 'sans-serif' }}>
        <h2>🚨 Application Error on Startup</h2>
        <pre style={{ background: '#f8f8f8', padding: 10, borderRadius: 5 }}>
          {err.message || String(err)}
        </pre>
      </div>
    )
  })

