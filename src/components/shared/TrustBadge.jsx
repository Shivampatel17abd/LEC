import { getBadge } from '../../utils/trustLogic';

const TrustBadge = ({ score }) => {
  const badge = getBadge(score);

  return (
    <div className="flex flex-col items-center">
      <div className={`px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}>
        {badge.label}
      </div>
      <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
        <div 
          className="bg-green-500 h-full transition-all duration-500" 
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-400 mt-1">Reputation: {score}%</span>
    </div>
  );
};

export default TrustBadge;