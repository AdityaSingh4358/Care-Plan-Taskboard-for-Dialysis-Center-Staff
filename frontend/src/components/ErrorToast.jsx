import { useEffect } from 'react'
import { useToastStore } from '../store/toastStore'

export default function ErrorToast() {
  const { message, clearMessage } = useToastStore()

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => clearMessage(), 4000)
    return () => clearTimeout(t)
  }, [message, clearMessage])

  if (!message) return null

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: '#ef4444', color: '#fff', padding: '12px 20px',
      borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      fontWeight: 500,
    }}>
      ⚠️ {message}
    </div>
  )
}
