import createHttpError from "http-errors";
import { getUsers, getUserSettings, patchUserSettings } from "../services/users-services.js";
import saveFileToPublicDir from "../utils/saveFileToPublicDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from "../env.js";

const enable_cloudinary = env('ENABLE_CLOUDINARY');

export const getAllUsersController = async (req, res) => {
        const contacts = await getUsers();
        res.status(200).json({
            status: res.statusCode,
            message: "Successfully found users!",
            data: contacts
        });
};

export const getUserSettingsController = async (req, res) => {
    const { _id: userId } = req.user;

    const user = await getUserSettings({_id:userId});

        if (!user) {
            throw createHttpError(404, `User with id ${userId} not found`);
        }
        res.status(200).json({
            status: res.statusCode,
            message: `Successfully found user with id ${userId}!`,
            data: user
        });
};

export const patchUserSettingsController = async (req, res) => {
    const userId = req.user._id;
    let avatar = req.file;
    let avatarUrl='';

    if (avatar) {
        if (enable_cloudinary === 'true') {
            avatarUrl = await saveFileToCloudinary(avatar, 'aqautracker');
        } else {
            avatarUrl = await saveFileToPublicDir(avatar);
        }
    };

    const user = await patchUserSettings(userId, {
        ...req.body,
        avatar:avatarUrl,
    });

    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    res.status(200).json({
        status: res.statusCode,
        message: 'Settings were updated successfully!',
        data: user
    });
};

