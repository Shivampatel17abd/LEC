import { useGlobalContext } from '../../context/AppContext';
import TrustBadge from '../../components/shared/TrustBadge';

const Profile = () => {
  const { user } = useGlobalContext();

  const myActivity = [
    { id: 1, type: 'Lent', item: 'Drill Machine', date: '2 days ago', status: 'Returned' },
    { id: 2, type: 'Borrowed', item: 'Ladder', date: '5 days ago', status: 'Active' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-xl">
            {user.name[0]}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full border-4 border-white">
            🪙 {user.points}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900">{user.name}</h1>
          <p className="text-gray-500 font-medium italic">"Helping neighbors since 2024"</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {user.badges.map(badge => (
              <span key={badge} className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-tighter">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Trust Score Component */}
        <div className="w-full md:w-48 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8">
          <TrustBadge score={user.trustScore} />
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Items Lent', val: '12', color: 'text-green-600' },
          { label: 'Lives Impacted', val: '45', color: 'text-blue-600' },
          { label: 'Money Saved', val: '₹2,400', color: 'text-purple-600' },
          { label: 'Requests Met', val: '8', color: 'text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* 3. Recent Activity Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Community Activity</h3>
          <button className="text-sm text-blue-600 font-bold">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {myActivity.map(act => (
            <div key={act.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  act.type === 'Lent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {act.type[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{act.item}</p>
                  <p className="text-xs text-gray-400">{act.date} • {act.type}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${
                act.status === 'Active' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-gray-100 text-gray-500'
              }`}>
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;