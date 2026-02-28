import { useState } from 'react';
import ItemCard from '../../components/cards/ItemCard';

const Home = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Mock Data: In real app, this comes from an API
  const items = [
    { id: 1, title: "Mountain Bike", price: "500/day", type: "Borrow", trustScore: 98, availability: "Available Now", category: "Sports" },
    { id: 2, title: "Electrician - 10yr Exp", price: "200", type: "Service", trustScore: 95, availability: "Available Today", category: "Repair" },
    { id: 3, title: "Used iPhone 13", price: "35,000", type: "Buy", trustScore: 82, availability: "Available Now", category: "Electronics" },
    { id: 4, title: "Drill Machine", price: "Free", type: "Borrow", trustScore: 91, availability: "Out of stock", category: "Tools" },
    { id: 5, title: "Home Made Tiffin", price: "80", type: "Service", trustScore: 89, availability: "Available Today", category: "Food" },
    { id: 6, title: "Study Table", price: "1,200", type: "Buy", trustScore: 75, availability: "Available Now", category: "Furniture" },
  ];

  const filteredItems = activeTab === 'All' 
    ? items 
    : items.filter(item => item.type === activeTab);

  return (
    <div className="space-y-10 pb-20">
      {/* 1. Hero Section (Small & Clean) */}
      <section className="relative h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-600 flex items-center px-8 text-white">
        <div className="z-10 max-w-lg">
          <h1 className="text-4xl font-black leading-tight">Everything you need, <br/> right next door.</h1>
          <p className="mt-2 opacity-80 font-medium text-sm">Borrow, Buy, or Hire from your verified neighbors.</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 text-[150px] font-black tracking-tighter select-none">LOCAL</div>
      </section>

      {/* 2. Explore & Filter Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Explore Indore</h2>
          
          {/* Tabs Filter */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
            {['All', 'Borrow', 'Buy', 'Service'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3. The Grid Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
          
          {/* Special "Post Your Own" Card */}
          <div className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              +
            </div>
            <p className="mt-4 font-bold text-gray-800">Got something to share?</p>
            <p className="text-xs text-gray-400 mt-1">Help your community and earn 🪙 50 points</p>
          </div>
        </div>
      </section>

      {/* 4. Trending Categories Slider (Optional) */}
      <section className="bg-gray-50 -mx-4 px-4 py-12 rounded-[40px]">
        <h3 className="text-xl font-bold mb-6 px-4 text-gray-700 uppercase tracking-widest text-center">Trending Right Now</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['Medicine', 'Electricians', 'Plumbers', 'Car Tools', 'Tutors', 'Pet Care'].map((c) => (
            <div key={c} className="flex-shrink-0 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:border-blue-500 transition cursor-pointer">
              {c}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;