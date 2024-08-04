export const calculateWaterProgress = (waterRate, waters) => {
  const sumWater = waters.reduce((sum, {waterAmount}) => {
    return sum + waterAmount;
  }, 0)

  console.log(`Water rate: ${sumWater}`);

  if (sumWater > waterRate) return 100;

  const progress = Math.round((sumWater / waterRate) * 100);

  return progress;
}