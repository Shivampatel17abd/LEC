import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/AppContext';

const Navbar = () => {
  const { user, toggleAuthModal } = useGlobalContext();
  const [isDashOpen, setIsDashOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[90] border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-blue-600">LocalEasyConnect</Link>

        <div className="flex items-center gap-4">
          {!user.isLoggedIn ? (
            <button 
              onClick={() => toggleAuthModal('login')}
              className="font-bold text-gray-700 hover:text-blue-600 px-4 py-2"
            >
              Login / Signup
            </button>
          ) : (
            <div className="relative">
              {/* Profile Icon (Triggers Dashboard) */}
              <button 
                onClick={() => setIsDashOpen(!isDashOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 bg-gray-50 rounded-full border border-gray-200 hover:border-blue-300 transition-all shadow-sm"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                  {user.name[0]}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black text-gray-900 leading-none">{user.name}</p>
                  <p className="text-[10px] text-green-600 font-bold uppercase mt-1">🛡️ {user.trustScore}% Trust</p>
                </div>
              </button>

              {/* Quick Dashboard Dropdown */}
              {isDashOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-[24px] shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-top-2 duration-200">
                   <div className="pb-4 mb-4 border-b border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Your Balance</p>
                      <p className="text-xl font-black text-gray-900">🪙 {user.points} <span className="text-xs text-gray-400">Points</span></p>
                   </div>
                   <div className="space-y-1">
                      <Link to="/profile" className="block p-3 hover:bg-blue-50 rounded-xl font-bold text-gray-700 hover:text-blue-600">My Profile</Link>
                      <button className="w-full text-left p-3 hover:bg-blue-50 rounded-xl font-bold text-gray-700 hover:text-blue-600">My Listings</button>
                      <button className="w-full text-left p-3 hover:bg-blue-50 rounded-xl font-bold text-gray-700 hover:text-blue-600 text-sm">Borrowing History</button>
                      <button className="w-full text-left p-3 hover:bg-red-50 rounded-xl font-bold text-red-600 mt-2 border-t border-gray-50">Logout</button>
                   </div>
                </div>
              )}
            </div>
          )}
          
          <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-xl transition-all active:scale-95">
            Post Ad
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;