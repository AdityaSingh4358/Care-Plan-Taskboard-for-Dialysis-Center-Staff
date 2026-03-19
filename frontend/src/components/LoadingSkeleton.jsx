export default function LoadingSkeleton() {
    return (
        <div style={{ display: 'flex', gap: 12, padding: 16 }}>
            {[1, 2, 3].map(i => (
                <div key={i} style={{
                    flex: 1, height: 120, borderRadius: 8,
                    background: 'linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                }} />
            ))}
            <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>
        </div>
    )
}


