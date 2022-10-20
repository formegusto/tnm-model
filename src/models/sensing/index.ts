import { model, Schema } from "mongoose";
import { ISensing } from "./types";

const SensingSchema = new Schema<ISensing>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    scheduleId: { type: Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: false,
    collection: "Sensing",
    versionKey: false,
  }
);

export const SensingModel = model<typeof SensingSchema>(
  "Sensing",
  SensingSchema
);
