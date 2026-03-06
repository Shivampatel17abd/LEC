import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PostAdModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('select'); // 'select' | 'requirement' | 'offering'

  const resetAndClose = () => {
    setStep('select');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
    }}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={resetAndClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(30,27,75,0.5)',
          backdropFilter: 'blur(6px)'
        }}
      />

      {/* Modal — wide enough to show side by side */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        style={{
          position: 'relative', zIndex: 10,
          background: '#FFFFFF',
          width: '100%',
          maxWidth: step === 'select' ? 680 : 520,
          borderRadius: 28,
          boxShadow: '0 24px 64px rgba(99,102,241,0.22)',
          border: '1.5px solid #C7D2FE',
          overflow: 'hidden',
          transition: 'max-width 0.3s ease'
        }}
      >
        {/* Top gradient bar */}
        <div style={{ height: 5, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A78BFA)' }} />

        <div style={{ padding: '36px 36px 32px' }}>

          {/* Close button */}
          <button onClick={resetAndClose} style={{
            position: 'absolute', top: 20, right: 24,
            background: '#EEF2FF', border: 'none', borderRadius: 8,
            width: 32, height: 32, cursor: 'pointer',
            color: '#6366F1', fontWeight: 900, fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>✕</button>

          <AnimatePresence mode="wait">

            {/* ── STEP 1: SELECT TYPE ── */}
            {step === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 900, fontSize: 16, marginBottom: 14,
                    boxShadow: '0 4px 14px rgba(99,102,241,0.35)'
                  }}>CC</div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1E1B4B', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
                    What's on your mind?
                  </h2>
                  <p style={{ color: '#818CF8', fontSize: 13, margin: 0, fontWeight: 500 }}>
                    Choose what kind of post you want to create
                  </p>
                </div>

                {/* Side by side option cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <OptionCard
                    icon="🙋"
                    title="Post Requirement"
                    desc="I'm looking for something — items, help, or services"
                    accent="#6366F1"
                    accentBg="#EEF2FF"
                    accentBorder="#C7D2FE"
                    onClick={() => setStep('requirement')}
                  />
                  <OptionCard
                    icon="🤝"
                    title="Post Offering"
                    desc="I want to sell, lend, or offer something to others"
                    accent="#8B5CF6"
                    accentBg="#F5F3FF"
                    accentBorder="#DDD6FE"
                    onClick={() => setStep('offering')}
                  />
                </div>

                {/* Bottom hint */}
                <p style={{ textAlign: 'center', color: '#A5B4FC', fontSize: 12, marginTop: 20, fontWeight: 500 }}>
                  🛡️ All posts are visible only to verified campus members
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: FORM ── */}
            {(step === 'requirement' || step === 'offering') && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <button onClick={() => setStep('select')} style={{
                  background: 'none', border: 'none', color: '#6366F1',
                  fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  padding: 0, marginBottom: 20, fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 4
                }}>← Back</button>

                {/* Form header */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{
                    display: 'inline-block',
                    background: step === 'requirement' ? '#EEF2FF' : '#F5F3FF',
                    color: step === 'requirement' ? '#6366F1' : '#8B5CF6',
                    border: `1.5px solid ${step === 'requirement' ? '#C7D2FE' : '#DDD6FE'}`,
                    borderRadius: 999, padding: '4px 14px',
                    fontSize: 11, fontWeight: 800, marginBottom: 10,
                    textTransform: 'uppercase', letterSpacing: '0.5px'
                  }}>
                    {step === 'requirement' ? '🙋 Requirement' : '🤝 Offering'}
                  </span>
                  <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1E1B4B', margin: 0, letterSpacing: '-0.4px' }}>
                    {step === 'requirement' ? 'What are you looking for?' : 'What are you offering?'}
                  </h2>
                </div>

                <FormFields type={step} onClose={resetAndClose} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Option Card ── */
const OptionCard = ({ icon, title, desc, accent, accentBg, accentBorder, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 20px', borderRadius: 20,
        border: `2px solid ${hovered ? accent : accentBorder}`,
        background: hovered ? accentBg : '#FAFBFF',
        cursor: 'pointer', textAlign: 'left',
        transition: 'all 0.2s', fontFamily: 'inherit',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 24px rgba(99,102,241,0.15)` : '0 1px 4px rgba(99,102,241,0.06)'
      }}
    >
      <span style={{ fontSize: 40, display: 'block', marginBottom: 14 }}>{icon}</span>
      <h4 style={{ fontWeight: 900, fontSize: 16, color: '#1E1B4B', margin: '0 0 6px', letterSpacing: '-0.2px' }}>{title}</h4>
      <p style={{ color: '#818CF8', fontSize: 12, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{desc}</p>
      <div style={{
        marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 4,
        color: accent, fontSize: 12, fontWeight: 800
      }}>
        Get started →
      </div>
    </button>
  );
};

/* ── Form Fields ── */
const inputStyle = {
  width: '100%', padding: '13px 16px',
  background: '#F5F3FF', border: '2px solid #E0E7FF',
  borderRadius: 12, outline: 'none', fontSize: 14,
  color: '#1E1B4B', fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  boxSizing: 'border-box', transition: 'border-color 0.2s'
};

const CATEGORIES = ['Buy/Sell', 'Rent', 'Services', 'Jobs', 'Free'];

const FormFields = ({ type, onClose }) => {
  const [form, setForm] = useState({ title: '', category: '', desc: '', price: '', contact: '' });

  const handleSubmit = () => {
    // Wire up to your actual submit logic here
    console.log('Submitting:', type, form);
    onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        placeholder={type === 'requirement' ? 'What do you need? (e.g. Science textbook)' : 'What are you offering? (e.g. Laptop for sale)'}
        style={inputStyle}
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        onFocus={e => e.target.style.borderColor = '#6366F1'}
        onBlur={e => e.target.style.borderColor = '#E0E7FF'}
      />

      <select
        style={{ ...inputStyle, cursor: 'pointer' }}
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <textarea
        placeholder={type === 'requirement'
          ? 'Describe what you need — condition, budget, urgency...'
          : 'Describe what you\'re offering — condition, specs, usage...'}
        style={{ ...inputStyle, height: 100, resize: 'none' }}
        value={form.desc}
        onChange={e => setForm({ ...form, desc: e.target.value })}
        onFocus={e => e.target.style.borderColor = '#6366F1'}
        onBlur={e => e.target.style.borderColor = '#E0E7FF'}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input
          placeholder={type === 'requirement' ? 'Max Budget (₹)' : 'Asking Price (₹)'}
          style={inputStyle}
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          onFocus={e => e.target.style.borderColor = '#6366F1'}
          onBlur={e => e.target.style.borderColor = '#E0E7FF'}
        />
        <input
          placeholder="WhatsApp / Contact"
          style={inputStyle}
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
          onFocus={e => e.target.style.borderColor = '#6366F1'}
          onBlur={e => e.target.style.borderColor = '#E0E7FF'}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        style={{
          width: '100%', padding: '14px',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          color: '#fff', border: 'none', borderRadius: 14,
          fontWeight: 900, fontSize: 15, cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(99,102,241,0.35)',
          fontFamily: 'inherit', marginTop: 4
        }}
      >
        {type === 'requirement' ? '📢 Post Requirement' : '🏷️ Post Offering'}
      </motion.button>

      <p style={{ textAlign: 'center', color: '#A5B4FC', fontSize: 11, fontWeight: 600, margin: '4px 0 0' }}>
        🛡️ Visible only to your campus community
      </p>
    </div>
  );
};

export default PostAdModal;