import { WaterCollection } from '../db/models/water.js';
import { calculateWaterProgress } from '../utils/calculateWaterProgress.js';

export const getDayWater = async ({date, waterRate, userId}) => {
  const startDate = `${date}T00:00`;
  const endDate = `${date}T23:59`;

  const query = {
    userId,
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }

  const waters = await WaterCollection.find(query)

  const dailyProgress = calculateWaterProgress(waterRate, waters)

  return { waters, dailyProgress}
}

export const addWater = async (payload) => {
  const water = await WaterCollection.create(payload);
  return water;
};

export const deleteWater = async ({ waterId, userId }) => {
  const water = await WaterCollection.findOneAndDelete({
    _id: waterId,
    userId,
  });

  return water;
};

export const updateWater = async ({
  waterId,
  userId,
  payload,
  options = {},
}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: waterId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
