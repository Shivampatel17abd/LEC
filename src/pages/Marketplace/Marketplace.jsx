import ItemCard from '../../components/cards/ItemCard';

const Marketplace = ({ type }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize">
          {type === 'sharing' ? 'Borrow Items' : 'Local Marketplace'}
        </h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">Filters</button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">Map View</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* We will map through real items here later */}
        <p className="text-gray-500 italic">No items listed in your immediate vicinity yet...</p>
      </div>
    </div>
  );
};

export default Marketplace;