import createHttpError from "http-errors";
import { getUserSettings, patchUserSettings } from "../services/users-services.js";

export const getUserSettingsController = async (req, res) => {
    const { _id: userId } = req.user;

    const user = await getUserSettings({_id:userId});

        if (!user) {
            throw createHttpError(404, `Contact with id ${userId} not found`);
        }
        res.status(200).json({
            status: res.statusCode,
            message: `Successfully found contact with id ${userId}!`,
            data: user
        });
};


export const patchUserSettingsController = async (req, res) => {
    const userId = req.user._id;
    const user = await patchUserSettings(userId, req.body);
    
    if (!user) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: res.statusCode,
        message: 'Settings were updated successfully!',
        data: user
    });
};

