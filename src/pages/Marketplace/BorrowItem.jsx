import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/AppContext';

const BorrowItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [selectedDate, setSelectedDate] = useState(null);

  // In a real app, fetch item by id. For now, we use mock:
  const item = {
    id: id,
    title: "Bosch Cordless Drill",
    owner: "Amit Sharma",
    phone: "919876543210",
    trustScore: 94,
    deposit: 500,
    price: "150/day",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800",
    desc: "Professional grade drill. Includes 2 batteries and a charger. Ideal for home repair and woodworking.",
    location: "Indore, Sector 7"
  };

  const handleWhatsApp = () => {
    const msg = `Hi ${item.owner}, I want to borrow your ${item.title} for ${selectedDate} Oct. Is it free?`;
    window.open(`https://wa.me/${item.phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 font-bold text-gray-500 hover:text-black transition">
        ← Back to Explore
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: The "Shared" Visuals */}
        <motion.div layoutId={`card-container-${id}`} className="space-y-6">
          <motion.img 
            layoutId={`card-image-${id}`}
            src={item.image} 
            className="w-full h-[500px] object-cover rounded-[40px] shadow-2xl" 
          />
          
          <div className="p-2">
            <motion.h1 layoutId={`card-title-${id}`} className="text-4xl font-black text-gray-900">
              {item.title}
            </motion.h1>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl font-bold text-sm border border-green-100">
                🛡️ {item.trustScore}% Verified Owner
              </div>
              <div className="text-gray-400 font-medium text-sm">📍 {item.location}</div>
            </div>

            <div className="mt-10 space-y-4">
              <h3 className="text-xl font-black text-gray-800">Product Description</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Booking Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-8 h-fit sticky top-24"
        >
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rent Price</p>
              <p className="text-3xl font-black text-blue-600">₹{item.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Security Deposit</p>
              <p className="text-xl font-black text-gray-900">₹{item.deposit}</p>
            </div>
          </div>

          <div className="space-y-6">
             <p className="font-black text-gray-800">Select Borrow Date</p>
             {/* Simplified Date Picker */}
             <div className="grid grid-cols-7 gap-2">
                {[...Array(14)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedDate(i+1)}
                    className={`h-12 rounded-xl font-bold transition-all ${selectedDate === i+1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    {i+1}
                  </button>
                ))}
             </div>

             <button 
               onClick={handleWhatsApp}
               disabled={!selectedDate}
               className={`w-full py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all ${selectedDate ? 'bg-[#25D366] text-white shadow-lg shadow-green-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
             >
               Confirm & Message Owner
             </button>
             <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">No hidden fees • 100% Local</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BorrowItem;