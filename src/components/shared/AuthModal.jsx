import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';

const AuthModal = () => {
  const { isAuthModalOpen, authView, toggleAuthModal, setUser } = useGlobalContext();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

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
    
    // Simulate real database creation
    setTimeout(() => {
      setUser({ 
        isLoggedIn: true, 
        name: formData.name || "New Neighbor", 
        trustScore: 80, 
        points: 50, 
        badges: ["Early Adopter"] 
      });
      setIsSubmitting(false);
      toggleAuthModal();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={() => toggleAuthModal()}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div 
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="p-10">
          <header className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              {authView === 'login' ? 'Welcome Back' : 'Join Your Community'}
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              {authView === 'login' 
                ? 'Sign in to see what’s new in your neighborhood.' 
                : 'Share tools, help neighbors, and build local trust.'}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {authView === 'signup' && (
                <>
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <input 
                      type="text" name="name" placeholder="Your Full Name" 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none border-2 transition-all ${errors.name ? 'border-red-400' : 'border-transparent focus:border-blue-500'}`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.name}</p>}
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <input 
                      type="tel" name="phone" placeholder="WhatsApp Number (for alerts)" 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none border-2 transition-all ${errors.phone ? 'border-red-400' : 'border-transparent focus:border-blue-500'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.phone}</p>}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <input 
              type="email" placeholder="Email Address" 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none border-2 transition-all ${errors.email ? 'border-red-400' : 'border-transparent focus:border-blue-500'}`}
            />
            {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.email}</p>}

            <input 
              type="password" placeholder="Create Password" 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none border-2 transition-all ${errors.password ? 'border-red-400' : 'border-transparent focus:border-blue-500'}`}
            />
            {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.password}</p>}

            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 mt-4 disabled:bg-gray-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : authView === 'login' ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          {/* New "Why Join" Section for Signup only */}
          {authView === 'signup' && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-2xl">
                <p className="text-xs font-black text-blue-700">🪙 +50 Points</p>
                <p className="text-[9px] text-blue-500 uppercase font-bold mt-1 tracking-tighter">Welcome Bonus</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-2xl">
                <p className="text-xs font-black text-green-700">🛡️ 80% Score</p>
                <p className="text-[9px] text-green-500 uppercase font-bold mt-1 tracking-tighter">Initial Trust</p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <button 
              onClick={() => {setErrors({}); toggleAuthModal(authView === 'login' ? 'signup' : 'login')}}
              className="text-blue-600 font-bold hover:text-blue-800 transition text-sm"
            >
              {authView === 'login' ? "Don't have an account? Join Now" : "Already a member? Sign In"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;