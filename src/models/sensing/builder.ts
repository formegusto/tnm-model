import moment from "moment";
import { getTimezoneDate } from "../../utils";
import { Human, Schedule, Sensing, ScoreBoard } from "../types";

interface ISensing {
  name: string;
  startTime: string;
  endTime: string;
}

export interface PSensings {
  name: string;
  sensings: ISensing[];
}

export interface PSensing {
  name: string;
  sensing: ISensing;
}

export class SensingBuilder {
  static async get({ name, sensing }: PSensing) {
    const human = await Human.findByName(name);
    const schedule = await Schedule.findByName(sensing.name);

    if (human && schedule) {
      let startTime = moment(sensing.startTime, "YYYYMMDDTHH:mm").toDate();
      startTime = getTimezoneDate(startTime);
      let endTime = moment(sensing.endTime, "YYYYMMDDTHH:mm").toDate();
      endTime = getTimezoneDate(endTime);

      const errMinute = moment(endTime).diff(startTime, "minutes");
      const score = await ScoreBoard.find(errMinute)!;

      return new Sensing({
        userId: human._id!,
        scheduleId: schedule._id!,
        startTime,
        endTime,
        score,
      });
    }

    return;
  }
}
