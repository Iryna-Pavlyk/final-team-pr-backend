import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/user-constants.js';

const userSchema = new Schema({
    name: {
        type: String,
        default: 'User',
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true, versionKey: false});

userSchema.post("save", mongooseSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", mongooseSaveError);

const User = model("user", userSchema);

export default User;
