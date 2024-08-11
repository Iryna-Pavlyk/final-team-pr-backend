import { WaterCollection } from '../db/models/water.js';
import { calculateWaterProgress } from '../utils/calculateWaterProgress.js';
import createHttpError from 'http-errors';

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

export const getMonthWater = async ({date, waterRate, userId}) => {
  const startDate = `${date}-01T00:00`;
  console.log(date);
  const [year, month] = date.split('-')
  const numberOfDays = new Date(year, month, 0).getDate()
  const endDate = `${date}-${String(numberOfDays).padStart(2, '0')}T23:59`

  const query = [
    {
      $match: {
        userId,
        date: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $group: {
        _id: {$substr: ["$date", 0, 10]},
        waters: {$push: '$$ROOT'}
      }
    },
    {
      $sort: {_id: 1}
    }
  ]

  const waters = await WaterCollection.aggregate(query);

  const results = Array.from({ length: numberOfDays }, (_, i) => ({
    date: `${date}-${String(i + 1).padStart(2, '0')}`,
    dailyProgress: 0
  }));

  waters.forEach(water => {
    const index = Number(water._id.slice(-2)) - 1
    results[index].dailyProgress = calculateWaterProgress(waterRate, water.waters)
  })

  return results
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
  const water = await WaterCollection.findOneAndUpdate(
    { _id: waterId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  return water.value
};
