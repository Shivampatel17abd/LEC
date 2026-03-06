import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';

const QUICK_CITIES = ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Pithampur'];

const LocationModal = () => {
  const { isLocationModalOpen, closeLocationModal, updateLocation, location } = useGlobalContext();
  const [newCity, setNewCity] = useState('');

  const handleUpdate = () => {
    if (!newCity.trim()) return;
    updateLocation(newCity.trim());
    setNewCity('');
  };

  return (
    <AnimatePresence>
      {isLocationModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLocationModal}
            style={{ position: 'absolute', inset: 0, background: 'rgba(30,27,75,0.5)', backdropFilter: 'blur(6px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            style={{
              position: 'relative', zIndex: 10, background: '#fff',
              borderRadius: 24, padding: '32px', width: '100%', maxWidth: 400,
              border: '1.5px solid #C7D2FE',
              boxShadow: '0 20px 60px rgba(99,102,241,0.2)'
            }}
          >
            <div style={{ height: 4, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: 4, marginBottom: 24 }} />

            <h3 style={{ fontWeight: 900, fontSize: 20, color: '#1E1B4B', margin: '0 0 6px' }}>
              📍 Change Location
            </h3>
            <p style={{ color: '#818CF8', fontSize: 13, fontWeight: 500, margin: '0 0 18px' }}>
              Current: <strong style={{ color: '#4338CA' }}>{location?.city}</strong>
            </p>

            {/* Quick city chips */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              {QUICK_CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => setNewCity(city)}
                  style={{
                    padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                    background: newCity === city ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : '#EEF2FF',
                    color: newCity === city ? '#fff' : '#4338CA',
                    border: newCity === city ? '2px solid transparent' : '2px solid #C7D2FE'
                  }}
                >{city}</button>
              ))}
            </div>

            {/* Text input */}
            <input
              value={newCity}
              onChange={e => setNewCity(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUpdate()}
              placeholder="Or type any city..."
              style={{
                width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                background: '#F5F3FF', border: '2px solid #C7D2FE',
                borderRadius: 12, outline: 'none', fontSize: 14,
                color: '#1E1B4B', fontFamily: 'inherit', marginBottom: 14,
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = '#C7D2FE'}
            />

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={closeLocationModal}
                style={{
                  flex: 1, background: '#F5F3FF', color: '#818CF8',
                  border: '1.5px solid #DDD6FE', borderRadius: 12,
                  padding: '12px', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', fontFamily: 'inherit'
                }}
              >Cancel</button>
              <button
                onClick={handleUpdate}
                style={{
                  flex: 2, background: newCity.trim()
                    ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                    : '#E0E7FF',
                  color: newCity.trim() ? '#fff' : '#A5B4FC',
                  border: 'none', borderRadius: 12, padding: '12px',
                  fontWeight: 800, fontSize: 14,
                  cursor: newCity.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  boxShadow: newCity.trim() ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
                  transition: 'all 0.2s'
                }}
              >Update Location</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LocationModal;