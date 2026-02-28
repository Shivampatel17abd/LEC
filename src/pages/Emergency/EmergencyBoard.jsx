import { useState } from 'react';
import { useGlobalContext } from '../../context/AppContext';

const EmergencyBoard = () => {
  const { location } = useGlobalContext();
  const [requests, setRequests] = useState([
    { id: 1, type: 'Medicine', item: 'Asthma Inhaler', distance: '0.4km', urgency: 'High' },
    { id: 2, type: 'Tool', item: 'Car Jumper Cables', distance: '1.2km', urgency: 'Medium' },
  ]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <h1 className="text-2xl font-bold text-red-700 flex items-center gap-2">
          🚨 Live Emergency Board
        </h1>
        <p className="text-red-600 text-sm">Showing urgent needs within 2km of {location.city}</p>
      </header>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-5 rounded-xl shadow-sm border border-red-100 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-500">{req.type}</span>
              <h3 className="text-lg font-bold text-gray-800">{req.item}</h3>
              <p className="text-sm text-gray-500">📍 {req.distance} away</p>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition">
              I Can Help
            </button>
          </div>
        ))}
      </div>

      <button className="w-full py-4 border-2 border-dashed border-red-300 text-red-500 rounded-xl font-bold hover:bg-red-50">
        + Post an Urgent Request
      </button>
    </div>
  );
};

export default EmergencyBoard;