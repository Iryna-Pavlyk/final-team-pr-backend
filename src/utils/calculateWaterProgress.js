export const calculateWaterProgress = (waterRate, waters) => {
  const sumWater = waters.reduce((sum, {waterAmount}) => {
    return sum + waterAmount;
  }, 0)

  if (sumWater > waterRate) return 100;

  const progress = Math.round((sumWater / waterRate) * 100);
  console.log(`waterRate: ${waterRate}`);
  console.log(`waters: ${waters}`);
  console.log(`sumWater: ${sumWater}`);

  return progress;
}