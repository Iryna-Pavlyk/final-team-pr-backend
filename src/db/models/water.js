import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    waterRate: {
      type: Number,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    photo: { type: String },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('water', contactsSchema);
