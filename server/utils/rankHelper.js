exports.getRankFromScore = (averageScore) => {
  if (averageScore >= 90) return 'Elite';
  if (averageScore >= 85) return 'Expert';
  if (averageScore >= 70) return 'Advanced';
  if (averageScore >= 60) return 'Intermediate';
  if (averageScore >= 50) return 'Beginner';


  return 'Beginner';
};
