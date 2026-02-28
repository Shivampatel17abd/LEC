import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/AppContext';

const Navbar = () => {
  // Pulling global state from our Context
  const { location, user } = useGlobalContext();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* 1. Logo & Location Group */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">
            LocalLink
          </Link>
          
          <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
            <span className="text-sm font-semibold text-gray-700">
              📍 {location.isLoaded ? location.city : "Locating..."}
            </span>
            <span className="text-[10px] text-blue-500 font-bold uppercase underline">Change</span>
          </div>
        </div>

        {/* 2. Smart Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tools, neighbors, or shops..." 
              className="w-full bg-gray-100 border-none px-5 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all outline-none text-sm"
            />
            <kbd className="absolute right-3 top-2.5 bg-white px-1.5 py-0.5 rounded border text-[10px] text-gray-400">
              CTRL + K
            </kbd>
          </div>
        </div>

        {/* 3. Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Emergency Shortcut */}
          <Link 
            to="/emergency" 
            className="flex items-center gap-1.5 text-red-600 font-bold text-sm bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition animate-pulse"
          >
            <span>🆘</span>
            <span className="hidden sm:inline">Urgent Help</span>
          </Link>

          {/* User Trust & Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trust Score</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm font-bold text-gray-800">{user.trustScore}%</p>
            </div>

            <Link to="/profile" className="relative group">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center font-bold shadow-lg group-hover:scale-105 transition-transform">
                {user.name[0]}
              </div>
              {/* Reward Points Badge */}
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                {user.points}
              </span>
            </Link>
          </div>
          
          <button className="hidden md:block bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md active:scale-95 transition-all">
            Post Ad
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;