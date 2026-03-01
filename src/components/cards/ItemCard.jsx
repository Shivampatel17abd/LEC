import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  // Function to handle redirection
  const handleOpenDetails = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <motion.div 
      layoutId={`card-container-${item.id}`} // Matches the ID in BorrowItem
      onClick={handleOpenDetails}
      className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-3 hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-[20px]">
        {/* Animated Image */}
        <motion.img 
          layoutId={`card-image-${item.id}`}
          src={item.image || 'https://via.placeholder.com/300'} 
          alt={item.title} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Availability Badge */}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider ${
          item.availability === 'Available Now' ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {item.availability}
        </span>

        {/* Category Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-gray-800 uppercase">
          {item.type}
        </div>
      </div>

      <div className="mt-4 px-1 pb-2">
        {/* Animated Title */}
        <motion.h3 
          layoutId={`card-title-${item.id}`}
          className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors"
        >
          {item.title}
        </motion.h3>
        
        <p className="text-xs text-gray-400 mt-1 font-medium italic">
          📍 2 mins away in your locality
        </p>
        
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
            <span className="text-xl font-black text-blue-600">₹{item.price}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Safety</span>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg text-green-700 text-xs font-bold border border-green-100">
              🛡️ {item.trustScore}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;