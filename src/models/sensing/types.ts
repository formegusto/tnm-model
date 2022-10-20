import { Schema } from "mongoose";
import moment from "moment";
import { SensingModel } from ".";
import _ from "lodash";
import { getTimezoneDate } from "../../utils";
import { Human, Schedule } from "../types";

export interface MixedSensing {
  name: string;
  event: string;
  startTime: Date;
  endTime: Date;
  score: number;
}

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

  static async getOneMonth(month: number, name?: string) {
    let startTime = moment(
      `2022${month.toString().padStart(2, "0")}01T00:00`,
      "YYYYMMDDTHH:mm"
    ).toDate();
    startTime = getTimezoneDate(startTime);
    let endTime = moment(
      `2022${(month + 1).toString().padStart(2, "0")}01T00:00`,
      "YYYYMMDDTHH:mm"
    ).toDate();
    endTime = getTimezoneDate(endTime);

    let sensings = await SensingModel.find(
      {
        $and: [
          {
            startTime: {
              $gte: startTime,
            },
          },
          {
            start_time: {
              $lte: endTime,
            },
          },
        ],
      },
      { _id: 0 }
    );
    sensings = _.invokeMap(sensings, "toObject");
    const rtnSensings: MixedSensing[] = [];
    for (let { userId, scheduleId, ...sensingData } of sensings) {
      const human = await Human.findById(userId);
      const schedule = await Schedule.findById(scheduleId);

      rtnSensings.push({
        name: human!.name,
        event: schedule?.title === "출근 확인" ? "지각" : "자리 이탈",
        ...sensingData,
      });
    }

    return name
      ? _.filter(rtnSensings, ({ name: _name }) => name === _name)
      : rtnSensings;
  }
}
