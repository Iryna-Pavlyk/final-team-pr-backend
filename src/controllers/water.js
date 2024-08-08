import {
  addWater,
  deleteWater,
  getDayWater, getMonthWater,
  updateWater,
} from '../services/water.js';
import createHttpError from 'http-errors';

export const getDayWaterController = async (req, res, next) => {
  const {date} = req.query
  console.log(`user: ${req.user}`);
  const {waters, dailyProgress} = await getDayWater({
    date,
    waterRate: req.user.waterRate,
    userId: req.user._id
  })

  res.status(200).json({
    status: 200,
    message: `Successfully get waters for ${date}`,
    data: {
      dailyProgress,
      waters,
    }
  })
}

export const getMonthWaterController = async (req, res, next) => {
  const { date } = req.query;

  const data = await getMonthWater({
    date,
    waterRate: req.user.waterRate,
    userId: req.user._id})

  res.status(200).json({
    status: 200,
    message: `Successfully get month waters for ${date}`,
    data: {
      monthlyWater: data
    }
  })
}

export const addWaterController = async (req, res, next) => {
  const { waterAmount, date } = req.body;

  const water = await addWater({
    userId: req.user._id,
    waterAmount,
    date,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a water!`,
    data: water,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const userId = req.user._id;

  const water = await deleteWater({ waterId, userId });

  if (!water) {
    next(createHttpError(404, 'Water not found'));
    return;
  }

  res.status(204).send();
};

export const patchWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const userId = req.user._id;

  const result = await updateWater({
    waterId,
    userId,
    payload: { ...req.body },
  });

  if (!result) {
    next(createHttpError(404, 'Water not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a water!',
    data: result.water,
  });
};
