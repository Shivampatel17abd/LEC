import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ItemDetailModal from './ItemDetailModal';

const TYPE_COLORS = {
  'Buy/Sell': { bg: '#EEF2FF', color: '#6366F1', border: '#C7D2FE' },
  'Rent':     { bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
  'Services': { bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  'Jobs':     { bg: '#FFF1F2', color: '#E11D48', border: '#FECDD3' },
  'Free':     { bg: '#F5F3FF', color: '#8B5CF6', border: '#DDD6FE' },
};

const ItemCard = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);
  const typeStyle = TYPE_COLORS[item.type] || TYPE_COLORS['Buy/Sell'];

  return (
    <>
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(99,102,241,0.18)' }}
        onClick={() => setShowDetail(true)}
        style={{
          background: '#FFFFFF', borderRadius: 20,
          border: '1.5px solid #C7D2FE', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', height: '100%',
          boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
          transition: 'box-shadow 0.3s, transform 0.3s',
          cursor: 'pointer',
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 190, overflow: 'hidden', background: '#EEF2FF' }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          {/* Type badge */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: typeStyle.bg, color: typeStyle.color,
            border: `1.5px solid ${typeStyle.border}`,
            padding: '3px 11px', borderRadius: 999,
            fontSize: 10, fontWeight: 800, letterSpacing: '0.5px',
            textTransform: 'uppercase', backdropFilter: 'blur(4px)'
          }}>{item.type}</div>

          {/* Urgent badge */}
          {item.isUrgent && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              background: '#FFF1F2', color: '#E11D48',
              border: '1.5px solid #FECDD3',
              padding: '3px 9px', borderRadius: 999,
              fontSize: 10, fontWeight: 800
            }}>🔥 Urgent</div>
          )}

          {/* Trust badge (when not urgent) */}
          {!item.isUrgent && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(4px)',
              color: '#10B981', padding: '3px 9px', borderRadius: 999,
              fontSize: 10, fontWeight: 800
            }}>🛡️ {item.trustScore}%</div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
            <h3 style={{
              fontWeight: 800, fontSize: 15, color: '#1E1B4B', lineHeight: 1.3,
              margin: 0, flex: 1,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden'
            }}>{item.title}</h3>
            <span style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              fontWeight: 900, fontSize: 15, whiteSpace: 'nowrap'
            }}>{item.price === 0 ? 'FREE' : `₹${item.price.toLocaleString()}`}</span>
          </div>

          <p style={{
            color: '#818CF8', fontSize: 12, lineHeight: 1.55, flexGrow: 1, margin: '0 0 14px',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>{item.desc}</p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {item.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                fontSize: 10, fontWeight: 700, color: '#6366F1',
                background: '#EEF2FF', border: '1px solid #C7D2FE',
                borderRadius: 999, padding: '2px 8px'
              }}>#{tag}</span>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 12, borderTop: '1px solid #E0E7FF'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 11
              }}>{item.owner.charAt(0)}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#3730A3' }}>{item.owner.split(' ')[0]}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, color: '#818CF8', fontWeight: 600 }}>📍 {item.city}</span>
              <span style={{ fontSize: 10, color: '#A5B4FC', fontWeight: 500 }}>{item.postedAt}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <ItemDetailModal item={item} onClose={() => setShowDetail(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ItemCard;