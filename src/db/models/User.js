import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp, userGender } from '../../constants/user-constants.js';

const userSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: userGender,
        default: 'woman',
    },
    weight: {
        type: Number,
        default: 0,
    },
    timeOfSportActivities: {
        type: Number,
        default: 0,
    },
    waterToDrink: {
        type: Number,
        default: 1500,
    },
    avatar: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {timestamps: true, versionKey: false});

userSchema.post("save", mongooseSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", mongooseSaveError);

const User = model("user", userSchema);

export default User;
