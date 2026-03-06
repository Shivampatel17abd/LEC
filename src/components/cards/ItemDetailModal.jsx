import React from 'react';
import { motion } from 'framer-motion';

const TYPE_COLORS = {
  'Buy/Sell': { bg: '#EEF2FF', color: '#6366F1', border: '#C7D2FE' },
  'Rent': { bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
  'Services': { bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  'Jobs': { bg: '#FFF1F2', color: '#E11D48', border: '#FECDD3' },
  'Free': { bg: '#F5F3FF', color: '#8B5CF6', border: '#DDD6FE' },
};

const ItemDetailModal = ({ item, onClose }) => {
  const typeStyle = TYPE_COLORS[item.type] || TYPE_COLORS['Buy/Sell'];

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in your listing: ${item.title}`
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(30,27,75,0.55)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#FFFFFF',
          width: '100%',
          maxWidth: 780,
          borderRadius: 28,
          boxShadow: '0 24px 64px rgba(99,102,241,0.25)',
          border: '1.5px solid #C7D2FE',
          overflow: 'hidden',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top accent */}
        <div
          style={{
            height: 5,
            background:
              'linear-gradient(90deg, #6366F1, #8B5CF6, #A78BFA)',
            flexShrink: 0,
          }}
        />

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Image */}
          <div
            style={{
              position: 'relative',
              height: 280,
              overflow: 'hidden',
              background: '#EEF2FF',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background:
                  'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
              }}
            />

            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(4px)',
                border: '1px solid #C7D2FE',
                cursor: 'pointer',
                color: '#6366F1',
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              ✕
            </button>

            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                gap: 8,
              }}
            >
              <span
                style={{
                  background: typeStyle.bg,
                  color: typeStyle.color,
                  border: `1.5px solid ${typeStyle.border}`,
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {item.type}
              </span>

              {item.isUrgent && (
                <span
                  style={{
                    background: '#FFF1F2',
                    color: '#E11D48',
                    border: '1.5px solid #FECDD3',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  🔥 Urgent
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px 28px' }}>
            {/* Title + Price */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 22,
                  color: '#1E1B4B',
                  margin: 0,
                }}
              >
                {item.title}
              </h2>

              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    background:
                      'linear-gradient(135deg,#6366F1,#8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {item.price === 0
                    ? 'FREE'
                    : `₹${item.price.toLocaleString()}`}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginBottom: 20,
              }}
            >
              <MetaChip icon="📍" label={item.city} />
              <MetaChip icon="🕐" label={item.postedAt} />
              {item.condition && (
                <MetaChip icon="✨" label={`Condition: ${item.condition}`} />
              )}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 14,
                color: '#4B5563',
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              {item.desc}
            </p>

            {/* Seller + CTA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg,#6366F1,#8B5CF6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 900,
                  }}
                >
                  {item.owner.charAt(0)}
                </div>

                <div>
                  <p
                    style={{
                      fontWeight: 800,
                      fontSize: 15,
                      margin: 0,
                    }}
                  >
                    {item.owner}
                  </p>
                  <p style={{ fontSize: 12, margin: 0 }}>
                    🛡️ {item.trustScore}% trusted
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={`https://wa.me/91${item.ownerPhone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '12px 20px',
                    textDecoration: 'none',
                    fontWeight: 800,
                  }}
                >
                  💬 WhatsApp
                </a>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(item.ownerPhone)
                  }
                  style={{
                    background:
                      'linear-gradient(135deg,#6366F1,#8B5CF6)',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '12px 20px',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  📞 Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MetaChip = ({ icon, label }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      fontWeight: 700,
      background: '#EEF2FF',
      border: '1.5px solid #C7D2FE',
      borderRadius: 999,
      padding: '4px 12px',
    }}
  >
    {icon} {label}
  </span>
);

export default ItemDetailModal;