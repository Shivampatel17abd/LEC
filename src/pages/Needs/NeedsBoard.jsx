import { useState } from 'react';
import { useGlobalContext } from '../../context/AppContext';

const NeedsBoard = () => {
  const { location, user } = useGlobalContext();
  
  // Mock data for "Needs" posted by the community
  const [needs, setNeeds] = useState([
    {
      id: 1,
      user: "Rahul S.",
      item: "Drill Machine",
      duration: "1 Day",
      status: "Open",
      trustScore: 92,
      category: "Tools"
    },
    {
      id: 2,
      user: "Priya M.",
      item: "NCERT Class 10 Math Book",
      duration: "Flexible",
      status: "Matching",
      trustScore: 88,
      category: "Education"
    }
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header with Call to Action */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Needs Board</h1>
          <p className="text-gray-600 mt-1">Can't find it? Post a request and let the community help you.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all active:scale-95">
          + Post a Need
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Filters & Analytics */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold mb-4 text-gray-800"> Demand Heatmap</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Trending: Tools</span>
                <span className="font-bold text-blue-600">High Demand</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[85%]"></div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-5 rounded-xl text-white shadow-xl">
            <h3 className="font-bold mb-2"> Earn Points</h3>
            <p className="text-sm opacity-90 mb-4">Fulfill a request below to boost your Trust Score and earn rewards!</p>
            <div className="text-2xl font-black">+{user.points} XP</div>
          </div>
        </div>

        {/* Right: The Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-bold text-gray-700">Open Requests near {location.city}</h2>
            <select className="text-sm bg-transparent border-none font-medium text-blue-600 outline-none">
              <option>Newest First</option>
              <option>Highest Trust</option>
            </select>
          </div>

          {needs.map((need) => (
            <div key={need.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {need.category}
                    </span>
                    {need.status === "Matching" && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                         Matching Found
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    I need a <span className="underline decoration-blue-200">{need.item}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Required for: <span className="font-semibold text-gray-700">{need.duration}</span>
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">{need.user}</p>
                  <p className="text-[10px] text-green-600 font-bold">Trust: {need.trustScore}%</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-black transition">
                  I have this
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                   Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeedsBoard;