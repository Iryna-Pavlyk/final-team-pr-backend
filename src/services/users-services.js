import User from '../db/models/User.js';

export const getUsers = () => User.find().countDocuments();

export const getUserSettings = async (filter) => {
    const userInfo = await User.findById(filter);
    return userInfo;
};

export const patchUserSettings = async (userId, payload, options = {}) => {
    const result = await User.findOneAndUpdate({_id:userId}, payload, {
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

