import createHttpError from 'http-errors';
import {
  getUsers,
  getUserSettings,
  patchUserSettings,
} from '../services/users.js';
import saveFileToPublicDir from '../utils/saveFileToPublicDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../env.js';

const enable_cloudinary = env('ENABLE_CLOUDINARY');

export const getAllUsersController = async (req, res) => {
  const contacts = await getUsers();
  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found users!',
    data: contacts,
  });
};

export const getUserSettingsController = async (req, res) => {
  const userId = req.user._id;
  const user = await getUserSettings(userId);
  const { _id, updatedAt, ...filteredUser } = user;

  if (!user) {
    throw createHttpError(404, `User not found`);
  }
  res.status(200).json({
    status: res.statusCode,
    message: `Successfully found user data!`,
    data: {
      userData: filteredUser
    },
  });
};

export const patchUserSettingsController = async (req, res) => {
  const userId = req.user._id;
  let avatar = req.file;
  let avatarUrl = '';

  if (avatar) {
    if (enable_cloudinary === 'true') {
      avatarUrl = await saveFileToCloudinary(avatar, 'aquatracker');
    } else {
      avatarUrl = await saveFileToPublicDir(avatar);
    }
  }

  const user = await patchUserSettings(userId, {
    ...req.body,
    avatar: avatarUrl,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
    }

  res.status(200).json({
    status: res.statusCode,
    message: 'Settings were updated successfully!',
    data: user,
 });
};
