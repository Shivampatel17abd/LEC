import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';

const NAV_TABS = [
  { icon: '🏠', label: 'Home',      path: '/' },
  { icon: '🛍️', label: 'Browse',    path: '/buy-sell' },
  { icon: '🆘', label: 'Emergency', path: '/emergency' },
  { icon: '📋', label: 'Needs',     path: '/needs' },
  { icon: '👤', label: 'Profile',   path: '/profile' },
];

/* ─────────────────────────────────────────
   MOBILE SHELL
───────────────────────────────────────── */
const MobileShell = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    user, location,
    togglePostModal, toggleAuthModal,
    openLocationModal, logout
  } = useGlobalContext();

  // Close drawer on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#EEF2FF',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100vw',
      overflowX: 'hidden',
    }}>

      {/* ── MOBILE TOP BAR ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#FFFFFF',
        borderBottom: '1px solid #C7D2FE',
        height: 56,
        display: 'flex', alignItems: 'center',
        padding: '0 14px', gap: 10,
        boxShadow: '0 1px 12px rgba(99,102,241,0.08)',
        flexShrink: 0,
      }}>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px', borderRadius: 8, flexShrink: 0,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 20, height: 2.5,
              background: '#6366F1', borderRadius: 2
            }} />
          ))}
        </button>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', flex: 1, minWidth: 0 }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 11, flexShrink: 0,
            boxShadow: '0 3px 8px rgba(99,102,241,0.3)'
          }}>CC</div>
          <span style={{
            fontWeight: 800, fontSize: 14, color: '#1E1B4B',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>CampusConnect</span>
        </div>

        {/* City pill */}
        <button
          onClick={openLocationModal}
          style={{
            fontSize: 11, color: '#6366F1', fontWeight: 700,
            background: '#EEF2FF', padding: '5px 9px',
            borderRadius: 999, border: '1.5px solid #C7D2FE',
            cursor: 'pointer', fontFamily: 'inherit',
            whiteSpace: 'nowrap', flexShrink: 0
          }}
        >📍 {(location?.city || 'City').split(' ')[0]}</button>

        {/* Post Ad */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={togglePostModal}
          style={{
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#fff', border: 'none', borderRadius: 8,
            padding: '7px 11px', fontWeight: 800, fontSize: 12,
            cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
            boxShadow: '0 3px 10px rgba(99,102,241,0.3)',
            whiteSpace: 'nowrap'
          }}
        >+ Post</motion.button>
      </header>

      {/* ── DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'rgba(30,27,75,0.5)', backdropFilter: 'blur(4px)'
              }}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0,
                width: 280, zIndex: 201,
                background: '#FFFFFF',
                boxShadow: '4px 0 40px rgba(99,102,241,0.18)',
                display: 'flex', flexDirection: 'column',
                overflowY: 'auto'
              }}
            >
              {/* Accent bar */}
              <div style={{ height: 4, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A78BFA)', flexShrink: 0 }} />

              {/* Drawer header */}
              <div style={{
                padding: '18px 18px 14px',
                borderBottom: '1px solid #E0E7FF',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 900, fontSize: 13
                  }}>CC</div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 13, color: '#1E1B4B', margin: 0 }}>CampusConnect</p>
                    <p style={{ fontSize: 11, color: '#818CF8', margin: 0, fontWeight: 600 }}>
                      📍 {location?.city || 'Your City'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: '#EEF2FF', border: 'none', borderRadius: 8,
                    width: 30, height: 30, cursor: 'pointer', color: '#6366F1',
                    fontWeight: 900, fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >✕</button>
              </div>

              {/* User card */}
              <div style={{ margin: '14px 14px 6px' }}>
                {user?.isLoggedIn ? (
                  <div style={{
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    borderRadius: 16, padding: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        border: '2px solid rgba(255,255,255,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 900, fontSize: 17
                      }}>{user.name?.charAt(0).toUpperCase()}</div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: 14, color: '#fff', margin: 0 }}>{user.name}</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', margin: 0, fontWeight: 600 }}>
                          🛡️ {user.trustScore}% · 🪙 {user.points} pts
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/profile')}
                      style={{
                        width: '100%', background: 'rgba(255,255,255,0.2)',
                        color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)',
                        borderRadius: 10, padding: '9px', fontWeight: 700,
                        fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
                      }}
                    >View Dashboard →</button>
                  </div>
                ) : (
                  <div style={{
                    background: '#EEF2FF', borderRadius: 16, padding: '16px',
                    border: '1.5px solid #C7D2FE'
                  }}>
                    <p style={{ fontWeight: 800, fontSize: 14, color: '#1E1B4B', margin: '0 0 4px' }}>👋 Hey there!</p>
                    <p style={{ fontSize: 12, color: '#818CF8', margin: '0 0 12px', fontWeight: 500 }}>
                      Sign in to post, save and connect.
                    </p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => { toggleAuthModal('login'); }}
                        style={{
                          flex: 1, background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                          color: '#fff', border: 'none', borderRadius: 10, padding: '9px',
                          fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
                        }}
                      >Sign In</button>
                      <button
                        onClick={() => { toggleAuthModal('signup'); }}
                        style={{
                          flex: 1, background: '#fff', color: '#6366F1',
                          border: '1.5px solid #C7D2FE', borderRadius: 10, padding: '9px',
                          fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
                        }}
                      >Register</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Nav links */}
              <div style={{ padding: '6px 10px', flex: 1 }}>
                <p style={{
                  fontSize: 10, fontWeight: 800, color: '#A5B4FC',
                  textTransform: 'uppercase', letterSpacing: '0.8px',
                  margin: '10px 8px 6px'
                }}>Browse</p>

                {[
                  { icon: '🏠', label: 'Home',       path: '/' },
                  { icon: '🛍️', label: 'Buy / Sell', path: '/buy-sell' },
                  { icon: '🔑', label: 'Rent',        path: '/borrow' },
                  { icon: '🔧', label: 'Services',    path: '/buy-sell' },
                  { icon: '💼', label: 'Jobs',        path: '/buy-sell' },
                ].map(item => {
                  const active = pathname === item.path;
                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        padding: '10px 10px', borderRadius: 12, border: 'none',
                        background: active ? '#EEF2FF' : 'none',
                        cursor: 'pointer', fontFamily: 'inherit', marginBottom: 2
                      }}
                    >
                      <span style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: active ? '#E0E7FF' : '#F5F3FF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 17, flexShrink: 0
                      }}>{item.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: active ? '#6366F1' : '#374151' }}>
                        {item.label}
                      </span>
                      {active && <span style={{ marginLeft: 'auto', color: '#6366F1', fontSize: 10 }}>●</span>}
                    </button>
                  );
                })}

                <p style={{
                  fontSize: 10, fontWeight: 800, color: '#A5B4FC',
                  textTransform: 'uppercase', letterSpacing: '0.8px',
                  margin: '14px 8px 6px'
                }}>Community</p>

                {[
                  { icon: '🆘', label: 'Emergency Board', path: '/emergency' },
                  { icon: '📋', label: 'Needs Board',     path: '/needs' },
                ].map(item => {
                  const active = pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        padding: '10px 10px', borderRadius: 12, border: 'none',
                        background: active ? '#EEF2FF' : 'none',
                        cursor: 'pointer', fontFamily: 'inherit', marginBottom: 2
                      }}
                    >
                      <span style={{
                        width: 34, height: 34, borderRadius: 10, background: '#F5F3FF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17
                      }}>{item.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: active ? '#6366F1' : '#374151' }}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Drawer footer */}
              <div style={{ padding: '10px 14px 28px', borderTop: '1px solid #E0E7FF', flexShrink: 0 }}>
                <button
                  onClick={openLocationModal}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    background: '#EEF2FF', border: '1.5px solid #C7D2FE',
                    borderRadius: 12, padding: '11px 14px', cursor: 'pointer',
                    fontFamily: 'inherit', marginBottom: 10
                  }}
                >
                  <span style={{ fontSize: 18 }}>📍</span>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#4338CA', margin: 0 }}>
                      {location?.city || 'Set Location'}
                    </p>
                    <p style={{ fontSize: 10, color: '#818CF8', margin: 0, fontWeight: 600 }}>Tap to change</p>
                  </div>
                </button>
                {user?.isLoggedIn && (
                  <button
                    onClick={logout}
                    style={{
                      width: '100%', background: '#FFF1F2', color: '#E11D48',
                      border: '1.5px solid #FECDD3', borderRadius: 12, padding: '11px',
                      fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
                    }}
                  >Sign Out</button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── PAGE CONTENT (hides desktop Navbar on mobile) ── */}
      <div style={{ flex: 1, overflowX: 'hidden' }} className="mobile-content">
        {children}
      </div>

      {/* ── BOTTOM TAB BAR ── */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: '#FFFFFF', borderTop: '1px solid #C7D2FE',
        display: 'flex', alignItems: 'stretch',
        height: 60, boxShadow: '0 -4px 20px rgba(99,102,241,0.1)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {NAV_TABS.map(tab => {
          const active = pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 2,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 2px', fontFamily: 'inherit', position: 'relative'
              }}
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="tab-indicator"
                  style={{
                    position: 'absolute', top: 0, left: '20%', right: '20%',
                    height: 3, borderRadius: '0 0 3px 3px',
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                  }}
                />
              )}
              <span style={{
                fontSize: 20,
                filter: active ? 'none' : 'grayscale(0.5) opacity(0.55)',
                transition: 'filter 0.2s'
              }}>{tab.icon}</span>
              <span style={{
                fontSize: 10, fontWeight: active ? 800 : 600,
                color: active ? '#6366F1' : '#9CA3AF',
                letterSpacing: '0.2px', transition: 'color 0.2s'
              }}>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Spacer so content clears bottom tab bar */}
      <div style={{ height: 68, flexShrink: 0 }} />
    </div>
  );
};

/* ─────────────────────────────────────────
   RESPONSIVE WRAPPER (entry point)
───────────────────────────────────────── */
const ResponsiveWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  if (!isMobile) return <>{children}</>;
  return <MobileShell>{children}</MobileShell>;
};

export default ResponsiveWrapper;