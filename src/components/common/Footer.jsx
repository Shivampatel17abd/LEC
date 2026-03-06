const Footer = () => {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #C7D2FE',
      marginTop: 'auto',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
    }}>
      {/* Main footer content */}
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        padding: '48px 24px 36px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40
      }}>

        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 900, fontSize: 14,
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)', flexShrink: 0
            }}>CC</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#1E1B4B', letterSpacing: '-0.3px' }}>
              CampusConnect
            </span>
          </div>
          <p style={{ fontSize: 13, color: '#818CF8', lineHeight: 1.6, fontWeight: 500, margin: '0 0 20px' }}>
            Bridging awareness and access within your campus community. Buy, sell, rent — all in one place.
          </p>
          {/* Social / trust badges */}
          <div style={{ display: 'flex', gap: 8 }}>
            {['🛡️ Verified', '📍 Local', '🔒 Safe'].map(badge => (
              <span key={badge} style={{
                fontSize: 11, fontWeight: 700, color: '#6366F1',
                background: '#EEF2FF', border: '1px solid #C7D2FE',
                borderRadius: 999, padding: '4px 10px'
              }}>{badge}</span>
            ))}
          </div>
        </div>

        {/* Community column */}
        <div>
          <h4 style={{
            fontWeight: 800, fontSize: 13, color: '#1E1B4B',
            margin: '0 0 16px', textTransform: 'uppercase',
            letterSpacing: '0.6px'
          }}>Community</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Lending Guidelines', 'Trust & Safety', 'Local Events', 'Campus Groups'].map(item => (
              <li key={item}>
                <a href="#" style={{
                  fontSize: 13, color: '#6B7280', fontWeight: 600,
                  textDecoration: 'none', transition: 'color 0.15s',
                  display: 'flex', alignItems: 'center', gap: 6
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#6366F1'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
                >
                  <span style={{ color: '#C7D2FE', fontSize: 10 }}>▶</span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support column */}
        <div>
          <h4 style={{
            fontWeight: 800, fontSize: 13, color: '#1E1B4B',
            margin: '0 0 16px', textTransform: 'uppercase',
            letterSpacing: '0.6px'
          }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Emergency Mode FAQ', 'Contact Local Admin', 'Verified Shop Program', 'Report an Issue'].map(item => (
              <li key={item}>
                <a href="#" style={{
                  fontSize: 13, color: '#6B7280', fontWeight: 600,
                  textDecoration: 'none', transition: 'color 0.15s',
                  display: 'flex', alignItems: 'center', gap: 6
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#6366F1'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
                >
                  <span style={{ color: '#C7D2FE', fontSize: 10 }}>▶</span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick post CTA column */}
        <div>
          <h4 style={{
            fontWeight: 800, fontSize: 13, color: '#1E1B4B',
            margin: '0 0 16px', textTransform: 'uppercase',
            letterSpacing: '0.6px'
          }}>Get Started</h4>
          <p style={{ fontSize: 13, color: '#818CF8', fontWeight: 500, lineHeight: 1.6, margin: '0 0 16px' }}>
            Got something to share? Post it in seconds and reach your campus.
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#fff', border: 'none', borderRadius: 10,
            padding: '10px 20px', fontWeight: 800, fontSize: 13,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
            display: 'block', marginBottom: 10
          }}>+ Post an Ad</button>
          <p style={{ fontSize: 11, color: '#A5B4FC', fontWeight: 600, margin: 0 }}>
            🛡️ Visible only to campus members
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid #E0E7FF',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        maxWidth: 1320, margin: '0 auto'
      }}>
        <p style={{ fontSize: 12, color: '#A5B4FC', fontWeight: 600, margin: 0 }}>
          © 2026 CampusConnect Hyperlocal Network. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(link => (
            <a key={link} href="#" style={{
              fontSize: 12, color: '#A5B4FC', fontWeight: 600,
              textDecoration: 'none', transition: 'color 0.15s'
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#6366F1'}
              onMouseLeave={e => e.currentTarget.style.color = '#A5B4FC'}
            >{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;