import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    waterAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('water', contactsSchema);
