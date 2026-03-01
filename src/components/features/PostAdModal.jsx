import { useState } from 'react';
import { useGlobalContext } from '../../context/AppContext';

const PostAdModal = () => {
  const { isPostModalOpen, togglePostModal } = useGlobalContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ type: 'borrow', title: '', price: '', category: '' });

  if (!isPostModalOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-10 pt-10 flex justify-between items-center">
          <h2 className="text-2xl font-black text-gray-900">List an Item</h2>
          <button onClick={togglePostModal} className="text-gray-400 hover:text-black text-xl">✕</button>
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-6">
              <p className="font-bold text-gray-700">What would you like to do?</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'borrow', label: 'Lend/Share', icon: '🤝', desc: 'Free or small fee' },
                  { id: 'sell', label: 'Sell', icon: '💰', desc: 'Permanent sale' },
                  { id: 'service', label: 'Service', icon: '🛠️', desc: 'Skills/Help' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, type: opt.id })}
                    className={`p-6 rounded-3xl border-2 text-left transition-all ${
                      formData.type === opt.id ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-100' : 'border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{opt.icon}</span>
                    <p className="font-black text-gray-900">{opt.label}</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1 font-bold tracking-widest">{opt.desc}</p>
                  </button>
                ))}
              </div>
              <button onClick={handleNext} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-black">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2 tracking-widest">Item Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Electric Drill, Maths Tutor, etc." 
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2 tracking-widest">Category</label>
                  <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none">
                    <option>Tools</option>
                    <option>Education</option>
                    <option>Home Decor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2 tracking-widest">
                    {formData.type === 'borrow' ? 'Daily Fee (₹)' : 'Price (₹)'}
                  </label>
                  <input type="number" placeholder="0 for Free" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button onClick={handleBack} className="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition">Back</button>
                <button 
                  onClick={() => { alert('Post successful! +50 Points'); togglePostModal(); }}
                  className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition active:scale-95"
                >
                  Post Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostAdModal;