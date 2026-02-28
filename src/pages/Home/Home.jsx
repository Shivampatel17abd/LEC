import ItemCard from '../../components/cards/ItemCard';

const Home = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Your Town, Just a Click Away</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100">
            🤝 I Have Something
          </button>
          <button className="bg-blue-800 text-white border border-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-900">
            🔍 I Need Something
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Explore Nearby</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Borrow Tools', 'Buy/Sell', 'Local Services', 'Community Events'].map((cat) => (
            <div key={cat} className="p-6 bg-white border rounded-xl text-center cursor-pointer hover:border-blue-500">
              <span className="text-3xl block mb-2">📦</span>
              <span className="font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;