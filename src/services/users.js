import User from '../db/models/User.js';

export const getUsers = () => User.find().countDocuments();

export const getUserSettings = async (userId) => {
    const userInfo = await User.findById(userId);
    if (!userInfo) return null;
    const { password, ...filteredUserInfo } = userInfo.toObject();
    return filteredUserInfo;
};

export const patchUserSettings = async (userId, payload, options = {}) => {
    const result = await User.findOneAndUpdate({_id: userId}, payload, {
        includeResultMetadata: true,
        ...options,
    });

    if (!result || !result.value) return null;
    const { password, _id, updatedAt, ...filteredResultValue } = result.value.toObject();
    const isNew = payload && payload.lastErrorObject && payload.lastErrorObject.upserted;

    return {
        data: filteredResultValue,
        isNew,
    };
};

