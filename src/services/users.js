import User from '../db/models/User.js';

export const getUsers = () => User.find().countDocuments();

export const getUserSettings = async (userId) => {
    const userInfo = await User.findById(userId);

    if (!userInfo) return null;

    const { password, ...filteredUserInfo } = userInfo.toObject();
    return filteredUserInfo;
};

export const patchUserSettings = async (userId, payload, options = {}) => {
    const { email, password, ...filteredPayload } = payload;
    const result = await User.findOneAndUpdate({_id:userId}, filteredPayload, {
        includeResultMetadata: true,
        ...options,
    });
    if (!result || !result.value) return null;

    const isNew = payload && payload.lastErrorObject && payload.lastErrorObject.upserted;
    return {
        data: result.value,
        isNew,
    };
};

