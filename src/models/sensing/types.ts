import { Schema } from "mongoose";
import moment from "moment";
import { SensingModel } from ".";
import _ from "lodash";

export interface ISensing {
  _id?: Schema.Types.ObjectId | string;
  userId: Schema.Types.ObjectId | string;
  scheduleId: Schema.Types.ObjectId | string;
  startTime: Date;
  endTime: Date;
  score: number;
}

export class Sensing implements ISensing {
  _id?: Schema.Types.ObjectId | string;
  userId!: Schema.Types.ObjectId | string;
  scheduleId!: Schema.Types.ObjectId | string;
  startTime!: Date;
  endTime!: Date;
  score!: number;

  constructor(sensing: ISensing) {
    Object.assign(this, sensing);
  }

  async save() {
    const sensing = await SensingModel.create(_.toPlainObject(this));
    return sensing;
  }
}
