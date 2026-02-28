const ItemCard = ({ item }) => {
  // item: { title, price, type, trustScore, availability }
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={item.image || 'https://via.placeholder.com/150'} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
        <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${
          item.availability === 'Available Now' ? 'bg-green-500' : 'bg-yellow-500'
        }`}>
          {item.availability}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-500">2 mins away • {item.type}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-blue-700 text-xs">
            🛡️ Trust: {item.trustScore}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;