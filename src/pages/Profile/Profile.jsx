import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';
import { DUMMY_ITEMS } from '../../data/dummyItems';

const TABS = [
  { id: 'overview',  label: 'Overview',     icon: '🏠' },
  { id: 'listings',  label: 'My Listings',  icon: '📋' },
  { id: 'saved',     label: 'Saved Items',  icon: '❤️' },
  { id: 'messages',  label: 'Messages',     icon: '💬' },
  { id: 'settings',  label: 'Settings',     icon: '⚙️' },
];

const Profile = () => {
  const { user, toggleAuthModal } = useGlobalContext();

  // If not logged in — show gate
  if (!user?.isLoggedIn) {
    return <AuthGate toggleAuthModal={toggleAuthModal} />;
  }

  return <Dashboard />;
};

/* ── Auth Gate ── */
const AuthGate = ({ toggleAuthModal }) => (
  <div style={{
    minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#EEF2FF', fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: 24
  }}>
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#fff', borderRadius: 28, padding: '52px 40px',
        textAlign: 'center', maxWidth: 420, width: '100%',
        border: '1.5px solid #C7D2FE',
        boxShadow: '0 12px 40px rgba(99,102,241,0.12)'
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: 20, margin: '0 auto 20px',
        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32, boxShadow: '0 8px 24px rgba(99,102,241,0.3)'
      }}>👤</div>
      <h2 style={{ fontWeight: 900, fontSize: 24, color: '#1E1B4B', margin: '0 0 10px', letterSpacing: '-0.4px' }}>
        Sign in to view your Dashboard
      </h2>
      <p style={{ color: '#818CF8', fontSize: 14, fontWeight: 500, lineHeight: 1.6, margin: '0 0 32px' }}>
        Access your listings, saved items, messages and profile settings.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => toggleAuthModal('login')}
          style={{
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#fff', border: 'none', borderRadius: 14,
            padding: '14px', fontWeight: 900, fontSize: 15,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 6px 20px rgba(99,102,241,0.35)'
          }}
        >Sign In →</motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => toggleAuthModal('signup')}
          style={{
            background: '#EEF2FF', color: '#6366F1',
            border: '2px solid #C7D2FE', borderRadius: 14,
            padding: '13px', fontWeight: 800, fontSize: 15,
            cursor: 'pointer', fontFamily: 'inherit'
          }}
        >Create Account</motion.button>
      </div>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[['🛡️', '85% Trust Score'], ['🪙', '+50 Welcome Points'], ['📋', 'Post Listings'], ['❤️', 'Save Favourites']].map(([icon, label]) => (
          <div key={label} style={{
            background: '#F5F3FF', borderRadius: 12, padding: '10px 12px',
            border: '1px solid #E0E7FF', fontSize: 12, fontWeight: 700,
            color: '#4338CA', display: 'flex', alignItems: 'center', gap: 6
          }}>{icon} {label}</div>
        ))}
      </div>
    </motion.div>
  </div>
);

/* ── Main Dashboard ── */
const Dashboard = () => {
  const { user, setUser, location, setLocation, logout, items } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
    email: user?.email || '',
  });
  const [newCity, setNewCity] = useState('');

  const myListings = (items || DUMMY_ITEMS).slice(0, 3); // simulate user's listings
  const savedItems  = (items || DUMMY_ITEMS).slice(3, 6);

  const saveProfile = () => {
    setUser(prev => ({ ...prev, ...profileForm }));
    setEditingProfile(false);
  };

  const changeLocation = () => {
    if (!newCity.trim()) return;
    setLocation(prev => ({ ...prev, city: newCity }));
    localStorage.setItem('userCity', newCity);
    setLocationModal(false);
    setNewCity('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#EEF2FF', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── HERO BANNER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 60%, #A78BFA 100%)',
        padding: '40px 32px 80px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background circles for depth */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: 100, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: 24,
              background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, fontWeight: 900, color: '#fff', backdropFilter: 'blur(8px)',
              flexShrink: 0
            }}>{user?.name?.charAt(0).toUpperCase()}</div>

            <div style={{ flex: 1 }}>
              <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 26, margin: '0 0 4px', letterSpacing: '-0.4px' }}>
                {user?.name}
              </h1>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                  📍 {location?.city || 'Your City'}
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                  🛡️ {user?.trustScore}% Trust
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                  🪙 {user?.points} Points
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setLocationModal(true)}
                style={{
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 10,
                  padding: '9px 16px', fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(4px)'
                }}
              >📍 Change Location</button>
              <button
                onClick={() => { setEditingProfile(true); setActiveTab('settings'); }}
                style={{
                  background: 'rgba(255,255,255,0.2)', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 10,
                  padding: '9px 16px', fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(4px)'
                }}
              >✏️ Edit Profile</button>
            </div>
          </div>

          {/* Badge chips */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            {(user?.badges || []).map(badge => (
              <span key={badge} style={{
                background: 'rgba(255,255,255,0.18)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 999, padding: '4px 12px',
                fontSize: 11, fontWeight: 700, backdropFilter: 'blur(4px)'
              }}>🏅 {badge}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #C7D2FE',
        position: 'sticky', top: 64, zIndex: 40,
        boxShadow: '0 2px 12px rgba(99,102,241,0.06)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 20px', border: 'none', background: 'none',
                cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700,
                fontSize: 13, whiteSpace: 'nowrap', transition: 'color 0.2s',
                color: activeTab === tab.id ? '#6366F1' : '#6B7280',
                borderBottom: activeTab === tab.id ? '2px solid #6366F1' : '2px solid transparent',
              }}
            >{tab.icon} {tab.label}</button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >

            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                <StatCard icon="📋" label="Active Listings" value="3" sub="2 Buy/Sell · 1 Service" color="#6366F1" bg="#EEF2FF" border="#C7D2FE" />
                <StatCard icon="❤️" label="Saved Items"    value="3" sub="Browse your saves"    color="#E11D48" bg="#FFF1F2" border="#FECDD3" />
                <StatCard icon="🛡️" label="Trust Score"    value={`${user?.trustScore}%`} sub="Excellent standing" color="#10B981" bg="#F0FDF4" border="#BBF7D0" />
                <StatCard icon="🪙" label="Points Earned"  value={user?.points} sub="Early Adopter bonus" color="#D97706" bg="#FFFBEB" border="#FDE68A" />
                <StatCard icon="💬" label="Messages"       value="2"  sub="1 unread"            color="#8B5CF6" bg="#F5F3FF" border="#DDD6FE" />
                <StatCard icon="📍" label="Location"       value={location?.city} sub="Tap to change" color="#4338CA" bg="#EEF2FF" border="#C7D2FE" onClick={() => setLocationModal(true)} />
              </div>
            )}

            {/* ── MY LISTINGS ── */}
            {activeTab === 'listings' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1E1B4B', margin: 0 }}>My Listings</h3>
                  <span style={{ fontSize: 12, color: '#818CF8', fontWeight: 600 }}>{myListings.length} active</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {myListings.map(item => <ListingRow key={item.id} item={item} />)}
                </div>
              </div>
            )}

            {/* ── SAVED ── */}
            {activeTab === 'saved' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1E1B4B', margin: 0 }}>Saved Items</h3>
                  <span style={{ fontSize: 12, color: '#818CF8', fontWeight: 600 }}>{savedItems.length} saved</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {savedItems.map(item => <ListingRow key={item.id} item={item} saved />)}
                </div>
              </div>
            )}

            {/* ── MESSAGES ── */}
            {activeTab === 'messages' && (
              <div>
                <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1E1B4B', margin: '0 0 20px' }}>Messages</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { name: 'Rahul Sharma', msg: 'Is the JEE Notes still available?', time: '2h ago', unread: true },
                    { name: 'Priya Verma', msg: 'Can you do ₹4000 for the room?', time: '5h ago', unread: false },
                    { name: 'Aditya Joshi', msg: 'Thanks for the repair job!', time: '1d ago', unread: false },
                  ].map((m, i) => (
                    <div key={i} style={{
                      background: '#fff', borderRadius: 16, padding: '16px 20px',
                      border: `1.5px solid ${m.unread ? '#C7D2FE' : '#E0E7FF'}`,
                      display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                      boxShadow: m.unread ? '0 4px 14px rgba(99,102,241,0.1)' : 'none',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 800, fontSize: 16
                      }}>{m.name.charAt(0)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: 14, color: '#1E1B4B' }}>{m.name}</span>
                          <span style={{ fontSize: 11, color: '#818CF8', fontWeight: 600 }}>{m.time}</span>
                        </div>
                        <p style={{ fontSize: 13, color: '#6B7280', margin: '3px 0 0', fontWeight: m.unread ? 700 : 500 }}>
                          {m.msg}
                        </p>
                      </div>
                      {m.unread && (
                        <div style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: '#6366F1', flexShrink: 0
                        }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === 'settings' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Profile info */}
                <div style={{ gridColumn: '1/-1' }}>
                  <div style={{
                    background: '#fff', borderRadius: 20, padding: '28px',
                    border: '1.5px solid #C7D2FE'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <h3 style={{ fontWeight: 900, fontSize: 18, color: '#1E1B4B', margin: 0 }}>Profile Information</h3>
                      {!editingProfile ? (
                        <button onClick={() => setEditingProfile(true)} style={{
                          background: '#EEF2FF', color: '#6366F1', border: '1.5px solid #C7D2FE',
                          borderRadius: 10, padding: '8px 16px', fontWeight: 700,
                          fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
                        }}>✏️ Edit</button>
                      ) : (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setEditingProfile(false)} style={{
                            background: '#F5F3FF', color: '#818CF8', border: '1.5px solid #DDD6FE',
                            borderRadius: 10, padding: '8px 14px', fontWeight: 700,
                            fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
                          }}>Cancel</button>
                          <button onClick={saveProfile} style={{
                            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                            color: '#fff', border: 'none', borderRadius: 10,
                            padding: '8px 16px', fontWeight: 800, fontSize: 13,
                            cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
                          }}>Save Changes</button>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {[
                        { label: 'Full Name', key: 'name', placeholder: 'Your full name', icon: '👤' },
                        { label: 'Email',     key: 'email', placeholder: 'your@email.com', icon: '📧' },
                        { label: 'Phone',     key: 'phone', placeholder: '10-digit number', icon: '📱' },
                        { label: 'Address',   key: 'address', placeholder: 'Your area/locality', icon: '🏠' },
                      ].map(field => (
                        <div key={field.key}>
                          <label style={{ fontSize: 12, fontWeight: 800, color: '#4338CA', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }}>
                            {field.icon} {field.label}
                          </label>
                          {editingProfile ? (
                            <input
                              value={profileForm[field.key] || ''}
                              onChange={e => setProfileForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                              placeholder={field.placeholder}
                              style={{
                                width: '100%', padding: '11px 14px', boxSizing: 'border-box',
                                background: '#F5F3FF', border: '2px solid #C7D2FE',
                                borderRadius: 12, outline: 'none', fontSize: 14,
                                color: '#1E1B4B', fontFamily: 'inherit'
                              }}
                              onFocus={e => e.target.style.borderColor = '#6366F1'}
                              onBlur={e => e.target.style.borderColor = '#C7D2FE'}
                            />
                          ) : (
                            <div style={{
                              padding: '11px 14px', background: '#F8F8FF',
                              borderRadius: 12, border: '1.5px solid #E0E7FF',
                              fontSize: 14, color: profileForm[field.key] ? '#1E1B4B' : '#A5B4FC',
                              fontWeight: profileForm[field.key] ? 600 : 500
                            }}>
                              {profileForm[field.key] || `Add ${field.label.toLowerCase()}`}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Bio — full width */}
                      <div style={{ gridColumn: '1/-1' }}>
                        <label style={{ fontSize: 12, fontWeight: 800, color: '#4338CA', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }}>
                          📝 Bio
                        </label>
                        {editingProfile ? (
                          <textarea
                            value={profileForm.bio || ''}
                            onChange={e => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                            placeholder="Tell your campus community about yourself..."
                            style={{
                              width: '100%', padding: '11px 14px', height: 90,
                              boxSizing: 'border-box', resize: 'none',
                              background: '#F5F3FF', border: '2px solid #C7D2FE',
                              borderRadius: 12, outline: 'none', fontSize: 14,
                              color: '#1E1B4B', fontFamily: 'inherit'
                            }}
                            onFocus={e => e.target.style.borderColor = '#6366F1'}
                            onBlur={e => e.target.style.borderColor = '#C7D2FE'}
                          />
                        ) : (
                          <div style={{
                            padding: '11px 14px', background: '#F8F8FF',
                            borderRadius: 12, border: '1.5px solid #E0E7FF',
                            fontSize: 14, color: profileForm.bio ? '#1E1B4B' : '#A5B4FC',
                            fontWeight: 500, minHeight: 60
                          }}>
                            {profileForm.bio || 'Add a bio to introduce yourself'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location card */}
                <div style={{
                  background: '#fff', borderRadius: 20, padding: '24px',
                  border: '1.5px solid #C7D2FE'
                }}>
                  <h4 style={{ fontWeight: 900, fontSize: 16, color: '#1E1B4B', margin: '0 0 16px' }}>📍 Location</h4>
                  <div style={{
                    background: '#EEF2FF', borderRadius: 12, padding: '14px 16px',
                    border: '1.5px solid #C7D2FE', marginBottom: 14
                  }}>
                    <p style={{ fontWeight: 800, fontSize: 16, color: '#4338CA', margin: 0 }}>{location?.city || 'Not set'}</p>
                    <p style={{ fontSize: 12, color: '#818CF8', margin: '3px 0 0', fontWeight: 500 }}>Current location</p>
                  </div>
                  <button onClick={() => setLocationModal(true)} style={{
                    width: '100%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    color: '#fff', border: 'none', borderRadius: 12,
                    padding: '12px', fontWeight: 800, fontSize: 14,
                    cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
                  }}>Change Location</button>
                </div>

                {/* Danger zone */}
                <div style={{
                  background: '#fff', borderRadius: 20, padding: '24px',
                  border: '1.5px solid #FECDD3'
                }}>
                  <h4 style={{ fontWeight: 900, fontSize: 16, color: '#1E1B4B', margin: '0 0 16px' }}>⚠️ Account</h4>
                  <button
                    onClick={logout}
                    style={{
                      width: '100%', background: '#FFF1F2', color: '#E11D48',
                      border: '1.5px solid #FECDD3', borderRadius: 12,
                      padding: '12px', fontWeight: 800, fontSize: 14,
                      cursor: 'pointer', fontFamily: 'inherit'
                    }}
                  >Sign Out</button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── LOCATION CHANGE MODAL ── */}
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
              exit={{ y: 30, opacity: 0, scale: 0.96 }}
              style={{
                position: 'relative', zIndex: 10, background: '#fff',
                borderRadius: 24, padding: '32px', width: '100%', maxWidth: 420,
                border: '1.5px solid #C7D2FE',
                boxShadow: '0 20px 60px rgba(99,102,241,0.2)'
              }}
            >
              <div style={{ height: 4, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: 4, marginBottom: 24 }} />
              <h3 style={{ fontWeight: 900, fontSize: 20, color: '#1E1B4B', margin: '0 0 6px' }}>📍 Change Location</h3>
              <p style={{ color: '#818CF8', fontSize: 13, margin: '0 0 20px', fontWeight: 500 }}>
                Current: <strong style={{ color: '#4338CA' }}>{location?.city}</strong>
              </p>

              {/* Quick city chips */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'].map(city => (
                  <button key={city} onClick={() => setNewCity(city)} style={{
                    padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                    background: newCity === city ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : '#EEF2FF',
                    color: newCity === city ? '#fff' : '#4338CA',
                    border: newCity === city ? '2px solid transparent' : '2px solid #C7D2FE'
                  }}>{city}</button>
                ))}
              </div>

              <input
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
                placeholder="Or type your city..."
                style={{
                  width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                  background: '#F5F3FF', border: '2px solid #C7D2FE',
                  borderRadius: 12, outline: 'none', fontSize: 14,
                  color: '#1E1B4B', fontFamily: 'inherit', marginBottom: 16
                }}
                onFocus={e => e.target.style.borderColor = '#6366F1'}
                onBlur={e => e.target.style.borderColor = '#C7D2FE'}
                onKeyDown={e => e.key === 'Enter' && changeLocation()}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setLocationModal(false)} style={{
                  flex: 1, background: '#F5F3FF', color: '#818CF8',
                  border: '1.5px solid #DDD6FE', borderRadius: 12, padding: '12px',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit'
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
    </div>
  );
};

/* ── Reusable stat card ── */
const StatCard = ({ icon, label, value, sub, color, bg, border, onClick }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(99,102,241,0.15)' }}
    onClick={onClick}
    style={{
      background: '#fff', borderRadius: 20, padding: '24px',
      border: `1.5px solid ${border}`,
      boxShadow: '0 2px 10px rgba(99,102,241,0.06)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'box-shadow 0.2s, transform 0.2s'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, background: bg,
        border: `1.5px solid ${border}`, display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: 22
      }}>{icon}</div>
    </div>
    <p style={{ fontWeight: 900, fontSize: 28, color, margin: '16px 0 4px', letterSpacing: '-0.5px' }}>{value}</p>
    <p style={{ fontWeight: 800, fontSize: 14, color: '#1E1B4B', margin: 0 }}>{label}</p>
    <p style={{ fontWeight: 500, fontSize: 12, color: '#818CF8', margin: '4px 0 0' }}>{sub}</p>
  </motion.div>
);

/* ── Listing row ── */
const ListingRow = ({ item, saved }) => (
  <motion.div
    whileHover={{ x: 4 }}
    style={{
      background: '#fff', borderRadius: 16, padding: '16px 20px',
      border: '1.5px solid #E0E7FF', display: 'flex',
      alignItems: 'center', gap: 16, cursor: 'pointer',
      transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(99,102,241,0.05)'
    }}
  >
    <img src={item.image} alt={item.title} style={{
      width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0,
      border: '1.5px solid #E0E7FF'
    }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <h4 style={{
        fontWeight: 800, fontSize: 14, color: '#1E1B4B', margin: '0 0 4px',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
      }}>{item.title}</h4>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 10, fontWeight: 800, color: '#6366F1',
          background: '#EEF2FF', border: '1px solid #C7D2FE',
          borderRadius: 999, padding: '2px 8px', textTransform: 'uppercase'
        }}>{item.type}</span>
        <span style={{ fontSize: 12, color: '#818CF8', fontWeight: 600 }}>📍 {item.city}</span>
        <span style={{ fontSize: 12, color: '#818CF8', fontWeight: 500 }}>{item.postedAt}</span>
      </div>
    </div>
    <div style={{ textAlign: 'right', flexShrink: 0 }}>
      <p style={{
        fontWeight: 900, fontSize: 15,
        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        margin: 0
      }}>{item.price === 0 ? 'FREE' : `₹${item.price.toLocaleString()}`}</p>
      {saved && <p style={{ fontSize: 11, color: '#E11D48', fontWeight: 700, margin: '4px 0 0' }}>❤️ Saved</p>}
    </div>
  </motion.div>
);

export default Profile;