// In Navbar.jsx — replace the location span with this clickable version:
// You'll need to import useGlobalContext and add a locationModal state

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const NAV_LINKS = ['Buy/Sell', 'Rent', 'Services', 'Jobs'];

const Navbar = () => {
  const { location, setLocation, togglePostModal, user, toggleAuthModal, openLocationModal, logout } = useGlobalContext();
  const [profileOpen, setProfileOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [newCity, setNewCity] = useState('');
  const navigate = useNavigate();
  

  const changeLocation = () => {
    if (!newCity.trim()) return;
    setLocation(prev => ({ ...prev, city: newCity }));
    localStorage.setItem('userCity', newCity);
    setLocationModal(false);
    setNewCity('');
  };

  return (
    <>
      <nav style={{
        background: '#FFFFFF', borderBottom: '1px solid #C7D2FE',
        position: 'sticky', top: 0, zIndex: 100, height: 64,
        display: 'flex', alignItems: 'center', padding: '0 2rem', gap: 24,
        boxShadow: '0 1px 16px rgba(99,102,241,0.08)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
      }}>
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, cursor: 'pointer' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 14,
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
          }}>CC</div>
          <span style={{ fontWeight: 800, fontSize: 17, color: '#1E1B4B', letterSpacing: '-0.3px' }}>
            CampusConnect
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
          {NAV_LINKS.map(link => (
            <a key={link} href="#" style={{
              color: '#4338CA', fontWeight: 600, fontSize: 14,
              textDecoration: 'none', padding: '6px 14px', borderRadius: 8,
              transition: 'background 0.15s'
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#EEF2FF'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >{link}</a>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Clickable location pill */}
        <motion.button
  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
  onClick={openLocationModal}   // ← context handles auth check
  style={{
    fontSize: 12, color: '#6366F1', fontWeight: 700,
    background: '#EEF2FF', padding: '6px 14px',
    borderRadius: 999, border: '1.5px solid #C7D2FE',
    cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
  }}
>📍 {location?.city || 'Set Location'}</motion.button>

        {/* Post Ad */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={togglePostModal}
          style={{
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#fff', border: 'none', borderRadius: 10,
            padding: '9px 20px', fontWeight: 800, fontSize: 13,
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
            fontFamily: 'inherit', whiteSpace: 'nowrap'
          }}
        >+ Post Ad</motion.button>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <motion.div
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => setProfileOpen(p => !p)}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(99,102,241,0.3)',
              border: '2px solid #C7D2FE'
            }}
          >{user?.name?.charAt(0).toUpperCase() || 'G'}</motion.div>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', top: 48, right: 0,
                  background: '#FFFFFF', borderRadius: 16,
                  border: '1.5px solid #C7D2FE', minWidth: 220,
                  boxShadow: '0 12px 40px rgba(99,102,241,0.18)',
                  padding: '8px', zIndex: 200
                }}
              >
                <div style={{ padding: '10px 14px 12px', borderBottom: '1px solid #E0E7FF' }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#1E1B4B', margin: '0 0 3px' }}>{user?.name || 'Guest'}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#818CF8', fontWeight: 600 }}>🛡️ {user?.trustScore}%</span>
                    <span style={{ fontSize: 11, color: '#818CF8' }}>·</span>
                    <span style={{ fontSize: 11, color: '#818CF8', fontWeight: 600 }}>🪙 {user?.points} pts</span>
                  </div>
                </div>

                {[
                  { label: '📋 My Listings', tab: 'listings' },
                  { label: '❤️ Saved Items', tab: 'saved' },
                  { label: '💬 Messages',    tab: 'messages' },
                  { label: '⚙️ Settings',    tab: 'settings' },
                ].map(item => (
                  <button key={item.label}
                    onClick={() => { navigate('/profile'); setProfileOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 14px', borderRadius: 10, border: 'none',
                      background: 'none', fontSize: 13, color: '#374151',
                      fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#EEF2FF'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{item.label}</button>
                ))}

                <div style={{ borderTop: '1px solid #E0E7FF', marginTop: 4, paddingTop: 4 }}>
                  {user?.isLoggedIn ? (
                    <button onClick={() => { logout(); setProfileOpen(false); }} style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 14px', borderRadius: 10, border: 'none',
                      background: 'none', fontSize: 13, color: '#EF4444',
                      fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >Sign Out</button>
                  ) : (
                    <button onClick={() => { toggleAuthModal('login'); setProfileOpen(false); }} style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 14px', borderRadius: 10, border: 'none',
                      background: 'none', fontSize: 13, color: '#6366F1',
                      fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#EEF2FF'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >Sign In</button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ── LOCATION MODAL ── */}
      <AnimatePresence>
        {locationModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setLocationModal(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(30,27,75,0.5)', backdropFilter: 'blur(6px)' }}
            />
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0 }}
              style={{
                position: 'relative', zIndex: 10, background: '#fff',
                borderRadius: 24, padding: '32px', width: '100%', maxWidth: 400,
                border: '1.5px solid #C7D2FE', boxShadow: '0 20px 60px rgba(99,102,241,0.2)',
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
              }}
            >
              <div style={{ height: 4, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: 4, marginBottom: 24 }} />
              <h3 style={{ fontWeight: 900, fontSize: 20, color: '#1E1B4B', margin: '0 0 6px' }}>📍 Change Location</h3>
              <p style={{ color: '#818CF8', fontSize: 13, fontWeight: 500, margin: '0 0 18px' }}>
                Current: <strong style={{ color: '#4338CA' }}>{location?.city}</strong>
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Pithampur'].map(city => (
                  <button key={city} onClick={() => setNewCity(city)} style={{
                    padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    background: newCity === city ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : '#EEF2FF',
                    color: newCity === city ? '#fff' : '#4338CA',
                    border: newCity === city ? '2px solid transparent' : '2px solid #C7D2FE'
                  }}>{city}</button>
                ))}
              </div>
              <input
                value={newCity} onChange={e => setNewCity(e.target.value)}
                placeholder="Or type any city..."
                onKeyDown={e => e.key === 'Enter' && changeLocation()}
                style={{
                  width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                  background: '#F5F3FF', border: '2px solid #C7D2FE', borderRadius: 12,
                  outline: 'none', fontSize: 14, color: '#1E1B4B',
                  fontFamily: 'inherit', marginBottom: 14
                }}
                onFocus={e => e.target.style.borderColor = '#6366F1'}
                onBlur={e => e.target.style.borderColor = '#C7D2FE'}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setLocationModal(false)} style={{
                  flex: 1, background: '#F5F3FF', color: '#818CF8', border: '1.5px solid #DDD6FE',
                  borderRadius: 12, padding: '12px', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', fontFamily: 'inherit'
                }}>Cancel</button>
                <button onClick={changeLocation} style={{
                  flex: 2, background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff', border: 'none', borderRadius: 12, padding: '12px',
                  fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.35)'
                }}>Update Location</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;