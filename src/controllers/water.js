import {
  getAllWaters,
  addWater,
  getWaterById,
  deleteWater,
  updateWater,
} from '../services/water.js';
import createHttpError from 'http-errors';

export const getWaterController = async (req, res, next) => {
  const waters = await getAllWaters();
  res.status(200).json({
    status: 200,
    message: 'Successfully found waters!',
    data: waters,
  });
};

export const getWaterByIdController = async (req, res, next) => {
  const { waterId } = req.params;
  //   const userId = req.user._id;
  const userId = '66ab83cf8c458bbb511fa6ac';

  const water = await getWaterById({ waterId, userId });
  if (!water) {
    next(createHttpError(404, 'Water not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${waterId}!`,
    data: water,
  });
};

export const addWaterController = async (req, res, next) => {
  const { waterRate, time } = req.body;

  if (!waterRate || !time) {
    next(createHttpError(400, 'waterVolume and timeAdded are required'));
    return;
  }
  //   const userId = req.user._id;
  const userId = '66ab83cf8c458bbb511fa6ac';
  delete req.body._V;

  const water = await addWater({
    userId,
    ...req.body,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a water!`,
    data: water,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  //   const userId = req.user._id;
  const userId = '66ab83cf8c458bbb511fa6ac';

  const water = await deleteWater({ waterId, userId });

  if (!water) {
    next(createHttpError(404, 'Water not found'));
    return;
  }

  res.status(204).send();
};

export const patchWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  //   const userId = req.user._id;
  const userId = '66ab83cf8c458bbb511fa6ac';
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
