import { Schema } from "mongoose";

export interface ISensing {
  _id?: Schema.Types.ObjectId | string;
  userId: Schema.Types.ObjectId | string;
  scheduleId: Schema.Types.ObjectId | string;
  startTime: Date;
  endTime: Date;
  score: number;
}
