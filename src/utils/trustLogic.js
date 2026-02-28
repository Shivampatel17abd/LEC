/**
 * Simple logic to calculate user reputation
 * @param {Object} activity - { lendCount, fulfillRequests, reviews }
 */
export const calculateTrustScore = (activity) => {
  const baseScore = 50; // New users start at 50
  const lendBonus = activity.lendCount * 5;
  const helpBonus = activity.fulfillRequests * 10;
  const reviewAvg = activity.reviews.reduce((a, b) => a + b, 0) / activity.reviews.length || 0;
  
  const finalScore = baseScore + lendBonus + helpBonus + (reviewAvg * 2);
  return Math.min(finalScore, 100); // Cap at 100%
};

export const getBadge = (score) => {
  if (score >= 90) return { label: "Community Pillar", color: "bg-purple-100 text-purple-700" };
  if (score >= 75) return { label: "Verified Helper", color: "bg-blue-100 text-blue-700" };
  return { label: "Local Neighbor", color: "bg-gray-100 text-gray-700" };
};