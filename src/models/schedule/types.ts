import _ from "lodash";
import { Date, Schema } from "mongoose";
import { ScheduleModel } from ".";

export type ScheduleStatusType = "static" | "real-time" | "stop-observe";

export interface ISchedule {
  _id?: Schema.Types.ObjectId | string;
  title: string;
  startTime: number;
  endTime: number;
  statusType: ScheduleStatusType;
}

export class Schedule implements ISchedule {
  _id?: Schema.Types.ObjectId | string;
  title!: string;
  startTime!: number;
  endTime!: number;
  statusType!: ScheduleStatusType;

  constructor(schedule: ISchedule) {
    Object.assign(this, schedule);
  }

  async save() {
    const schedule = await ScheduleModel.create(_.toPlainObject(this));
    return schedule;
  }

  static async saveMany(schedules: ISchedule[]) {
    return await ScheduleModel.insertMany(schedules);
  }
}
