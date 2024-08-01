import { WaterCollection } from '../db/models/water.js';

export const getAllWaters = async () => {
  const waters = await WaterCollection.find();

  return waters;
};
export const getWaterById = async ({ waterId, userId }) => {
  const water = await WaterCollection.findOne({ _id: waterId, userId });
  return water;
};

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
