import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';

const AuthModal = () => {
  const { isAuthModalOpen, authView, setAuthView, toggleAuthModal, setUser } = useGlobalContext();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  // ✅ Switch view WITHOUT closing modal
  const switchView = (view) => {
    setErrors({});
    setFormData({ name: '', email: '', password: '', phone: '' });
    setAuthView(view);
  };

  const validate = () => {
    let newErrors = {};
    if (authView === 'signup') {
      if (!formData.name.trim()) newErrors.name = "We need your name for trust!";
      if (formData.phone.length < 10) newErrors.phone = "Enter a valid 10-digit number";
    }
    if (!formData.email.includes('@')) newErrors.email = "That doesn't look like an email";
    if (formData.password.length < 6) newErrors.password = "Security first: use 6+ characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setUser({
        isLoggedIn: true,
        name: formData.name || "Campus User",
        email: formData.email,
        phone: formData.phone,
        trustScore: 80,
        points: 50,
        badges: ["Early Adopter"]
      });
      setIsSubmitting(false);
      toggleAuthModal(); // close after success
    }, 1500);
  };

  const inputStyle = (hasError) => ({
    width: '100%', padding: '13px 18px', boxSizing: 'border-box',
    background: '#F5F3FF',
    border: `2px solid ${hasError ? '#EF4444' : '#E0E7FF'}`,
    borderRadius: 14, outline: 'none', fontSize: 14, color: '#1E1B4B',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif", transition: 'border-color 0.2s'
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
    }}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={() => toggleAuthModal()}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(30,27,75,0.55)', backdropFilter: 'blur(6px)'
        }}
      />

      {/* Modal */}
      <motion.div
        layout
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          background: '#FFFFFF', width: '100%', maxWidth: 440,
          borderRadius: 28, boxShadow: '0 24px 64px rgba(99,102,241,0.22)',
          border: '1.5px solid #C7D2FE', position: 'relative', zIndex: 10,
          overflow: 'hidden'
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 5, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A78BFA)' }} />

        <div style={{ padding: '36px 36px 32px' }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 900, fontSize: 16, marginBottom: 16,
              boxShadow: '0 4px 14px rgba(99,102,241,0.35)'
            }}>CC</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={authView}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
              >
                <h2 style={{
                  fontSize: 26, fontWeight: 900, color: '#1E1B4B',
                  margin: '0 0 6px', letterSpacing: '-0.5px'
                }}>
                  {authView === 'login' ? 'Welcome Back 👋' : 'Join Your Campus 🎓'}
                </h2>
                <p style={{ color: '#818CF8', fontSize: 13, margin: 0, fontWeight: 500 }}>
                  {authView === 'login'
                    ? "Sign in to access your dashboard and listings."
                    : "Create an account to buy, sell and connect."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              <AnimatePresence mode="popLayout">
                {authView === 'signup' && (
                  <>
                    <motion.div key="name"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text" placeholder="Your Full Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={inputStyle(errors.name)}
                        onFocus={e => e.target.style.borderColor = '#6366F1'}
                        onBlur={e => e.target.style.borderColor = errors.name ? '#EF4444' : '#E0E7FF'}
                      />
                      {errors.name && <p style={{ color: '#EF4444', fontSize: 11, fontWeight: 700, margin: '4px 0 0 4px' }}>{errors.name}</p>}
                    </motion.div>

                    <motion.div key="phone"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                    >
                      <input
                        type="tel" placeholder="WhatsApp Number (10 digits)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={inputStyle(errors.phone)}
                        onFocus={e => e.target.style.borderColor = '#6366F1'}
                        onBlur={e => e.target.style.borderColor = errors.phone ? '#EF4444' : '#E0E7FF'}
                      />
                      {errors.phone && <p style={{ color: '#EF4444', fontSize: 11, fontWeight: 700, margin: '4px 0 0 4px' }}>{errors.phone}</p>}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <input
                  type="email" placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle(errors.email)}
                  onFocus={e => e.target.style.borderColor = '#6366F1'}
                  onBlur={e => e.target.style.borderColor = errors.email ? '#EF4444' : '#E0E7FF'}
                />
                {errors.email && <p style={{ color: '#EF4444', fontSize: 11, fontWeight: 700, margin: '4px 0 0 4px' }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password" placeholder="Password (6+ characters)"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  style={inputStyle(errors.password)}
                  onFocus={e => e.target.style.borderColor = '#6366F1'}
                  onBlur={e => e.target.style.borderColor = errors.password ? '#EF4444' : '#E0E7FF'}
                />
                {errors.password && <p style={{ color: '#EF4444', fontSize: 11, fontWeight: 700, margin: '4px 0 0 4px' }}>{errors.password}</p>}
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%', padding: '14px',
                  background: isSubmitting ? '#C7D2FE' : 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff', border: 'none', borderRadius: 14,
                  fontWeight: 900, fontSize: 15,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: isSubmitting ? 'none' : '0 6px 20px rgba(99,102,241,0.35)',
                  fontFamily: 'inherit', marginTop: 4, transition: 'all 0.2s'
                }}
              >
                {isSubmitting
                  ? '⏳ Please wait...'
                  : authView === 'login' ? 'Sign In →' : 'Create Account →'}
              </motion.button>
            </div>
          </form>

          {/* Signup bonus cards */}
          <AnimatePresence>
            {authView === 'signup' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }} transition={{ delay: 0.1 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}
              >
                <div style={{
                  textAlign: 'center', padding: '12px 8px',
                  background: '#EEF2FF', borderRadius: 14, border: '1px solid #C7D2FE'
                }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: '#4338CA', margin: 0 }}>🪙 +50 Points</p>
                  <p style={{ fontSize: 10, color: '#818CF8', fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Welcome Bonus</p>
                </div>
                <div style={{
                  textAlign: 'center', padding: '12px 8px',
                  background: '#F0FDF4', borderRadius: 14, border: '1px solid #BBF7D0'
                }}>
                  <p style={{ fontSize: 13, fontWeight: 900, color: '#15803D', margin: 0 }}>🛡️ 80% Score</p>
                  <p style={{ fontSize: 10, color: '#4ADE80', fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Initial Trust</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ✅ Toggle — uses switchView, NOT toggleAuthModal */}
          <div style={{
            marginTop: 24, paddingTop: 20,
            borderTop: '1px solid #E0E7FF', textAlign: 'center'
          }}>
            {authView === 'login' ? (
              <p style={{ margin: 0, fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchView('signup')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#6366F1', fontWeight: 800, fontSize: 13,
                    fontFamily: 'inherit', textDecoration: 'underline'
                  }}
                >Join Now →</button>
              </p>
            ) : (
              <p style={{ margin: 0, fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchView('login')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#6366F1', fontWeight: 800, fontSize: 13,
                    fontFamily: 'inherit', textDecoration: 'underline'
                  }}
                >Sign In →</button>
              </p>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;