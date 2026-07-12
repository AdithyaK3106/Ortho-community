import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    // ponytail: embedding the standalone HTML dashboard logic into React.
    // For full interactivity, this would need a full React rewrite. For now,
    // we mount the dashboard in a container and let the existing JS run.
    // Upgrade: migrate dashboard JS to React components (state management, hooks).
  }, []);

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#ffffff' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Ortho Dashboard</h1>
      </header>
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px' }}>
        <div style={{ background: '#1a1a19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Repository Intelligence</h2>
          <p style={{ color: '#c3c2b7', marginBottom: '20px' }}>
            Dashboard component placeholder. The standalone HTML dashboard can be converted to React components here.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#222220', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#898781', marginBottom: '8px' }}>METRICS</div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>—</div>
              <div style={{ fontSize: '13px', color: '#c3c2b7', marginTop: '8px' }}>Files analyzed</div>
            </div>
            <div style={{ background: '#222220', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#898781', marginBottom: '8px' }}>IMPORTS</div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>—</div>
              <div style={{ fontSize: '13px', color: '#c3c2b7', marginTop: '8px' }}>Dependencies mapped</div>
            </div>
            <div style={{ background: '#222220', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#898781', marginBottom: '8px' }}>ARCHITECTURE</div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>—</div>
              <div style={{ fontSize: '13px', color: '#c3c2b7', marginTop: '8px' }}>Patterns detected</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
