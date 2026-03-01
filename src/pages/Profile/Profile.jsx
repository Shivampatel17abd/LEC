import { useGlobalContext } from '../../context/AppContext';

const Profile = () => {
  const { user } = useGlobalContext();

  const mySkills = ["Plumbing", "Mathematics", "Guitar", "Pet Sitting"];
  const myInventory = ["Heavy Duty Drill", "Camping Tent", "Car Jack"];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* 1. Reputation & Trust Header */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-[40px] p-10 shadow-sm border border-blue-100 flex flex-col md:flex-row items-center gap-10">
        <div className="relative">
          <div className="w-40 h-40 bg-blue-600 rounded-[3rem] rotate-3 flex items-center justify-center text-5xl font-black text-white shadow-2xl overflow-hidden border-8 border-white">
            <span className="-rotate-3">{user.name[0]}</span>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-yellow-400 px-4 py-2 rounded-2xl border-4 border-white font-black shadow-lg">
            🪙 {user.points}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
            <h1 className="text-4xl font-black text-gray-900">{user.name}</h1>
            <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-green-200">
              Verified Resident
            </span>
          </div>
          <p className="text-gray-500 font-medium max-w-md">"Indore Sector-7 Resident. Always happy to share tools and help with basic electrical work."</p>
          
          <div className="flex gap-4 pt-4">
            <div className="text-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-blue-100">
              <p className="text-2xl font-black text-blue-600">{user.trustScore}%</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trust Score</p>
            </div>
            <div className="text-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-blue-100">
              <p className="text-2xl font-black text-purple-600">Top 5%</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Impact & Resource Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Environmental Impact */}
        <div className="bg-gray-900 text-white p-8 rounded-[32px] space-y-4">
          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-[0.2em]">Eco-Impact</h3>
          <div className="space-y-6">
            <div>
              <p className="text-3xl font-black">12.5 kg</p>
              <p className="text-sm text-gray-400">Landfill Waste Prevented</p>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full">
              <div className="h-full bg-green-400 w-3/4 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
            </div>
          </div>
        </div>

        {/* Resource Library (The 'Have' Section) */}
        <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <h3 className="font-black text-gray-800">My Resource Library</h3>
            <button className="text-blue-600 font-bold text-sm">+ Add Skills/Tools</button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {myInventory.map(tool => (
              <span key={tool} className="bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-sm font-bold border border-orange-100">
                🧰 {tool}
              </span>
            ))}
            {mySkills.map(skill => (
              <span key={skill} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100">
                ✨ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Community Timeline */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-800 mb-8">Recent Community Acts</h3>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-100 before:to-transparent">
          
          {/* Act 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              🤝
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-gray-900">Lent a Drill to Rohan</div>
                <time className="text-xs font-medium text-blue-600">2 days ago</time>
              </div>
              <div className="text-gray-500 text-sm italic">"Rohan returned it in perfect condition. Great experience!"</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;