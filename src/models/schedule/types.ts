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

  static async findByName(name: string) {
    const scheduleDoc = await ScheduleModel.findOne({
      name,
    });
    if (scheduleDoc) return new Schedule(scheduleDoc.toObject());
    return;
  }

  static async findById(id: Schema.Types.ObjectId | string) {
    const scheduleDoc = await ScheduleModel.findById(id);
    if (scheduleDoc) return new Schedule(scheduleDoc.toObject());
    return;
  }
}
