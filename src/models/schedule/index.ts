import { model, Schema } from "mongoose";
import { ISchedule } from "./types";

const ScheduleSchema = new Schema<ISchedule>(
  {
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    statusType: { type: String, required: true },
  },
  {
    timestamps: false,
    collection: "Schedule",
    versionKey: false,
  }
);

export const ScheduleModel = model<typeof ScheduleSchema>(
  "Schedule",
  ScheduleSchema
);
