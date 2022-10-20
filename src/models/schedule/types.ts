import { Date, Schema } from "mongoose";

export type ScheduleStatusType = "static" | "real-time" | "stop-observe";

export interface ISchedule {
  _id?: Schema.Types.ObjectId | string;
  title: string;
  startTime: Date;
  endTime: Date;
  statusType: ScheduleStatusType;
}
