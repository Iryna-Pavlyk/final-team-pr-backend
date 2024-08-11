import {
  addWater,
  deleteWater,
  getDayWater, getMonthWater,
  updateWater,
} from '../services/water.js';
import createHttpError from 'http-errors';

export const getDayWaterController = async (req, res, next) => {
  const {date} = req.query
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

  if (!water) {
    // 409 checks by Joi and model. This is just extra protection in case to give more detailed message than Something going wrong
    throw createHttpError(500, `Failed to add water`);
  }

  const {dailyProgress} = await getDayWater({
    date: water.date.slice(0, water.date.indexOf('T')),
    waterRate: req.user.waterRate,
    userId: req.user._id
  })

  res.status(201).json({
    status: 201,
    message: `Successfully created a water!`,
    data: {
      updatedDailyProgress: dailyProgress,
      water
    },
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

  const {dailyProgress} = await getDayWater({
    date: water.date.slice(0, water.date.indexOf('T')),
    waterRate: req.user.waterRate,
    userId: req.user._id
  })

  res.status(200).json({
    status: 200,
    message: `Successfully deleted water!`,
    data: {
      updatedDailyProgress: dailyProgress,
      water
    }
  });
};

export const patchWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const userId = req.user._id;

  const water = await updateWater({
    waterId,
    userId,
    payload: { ...req.body },
  });

  if (!water) {
    next(createHttpError(404, 'Water not found'));
    return;
  }

  const {dailyProgress} = await getDayWater({
    date: water.date.slice(0, water.date.indexOf('T')),
    waterRate: req.user.waterRate,
    userId: req.user._id
  })

  res.json({
    status: 200,
    message: 'Successfully update a water!',
    data: {
      updatedDailyProgress: dailyProgress,
      water
    }
  });
};
