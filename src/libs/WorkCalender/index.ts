import _ from "lodash";
import { MixedSensing, Sensing } from "../../models/types";

export interface IWorkCalender {
  month: number;
  name: string;
  sensings: MixedSensing[];
}

export class WorkCalender implements IWorkCalender {
  month!: number;
  name!: string;
  sensings!: MixedSensing[];

  constructor(calender: IWorkCalender) {
    Object.assign(this, calender);
  }

  get dayGroupScore() {
    const days = _.map(this.sensings, ({ startTime }) =>
      startTime.getUTCDate()
    );
    const scores = _.map(this.sensings, ({ score }) => score);

    const zipDatas = _.zip(days, scores);
    const groups = _.groupBy(zipDatas, "0");

    return _.mapValues(groups, (zip) =>
      _.sumBy(zip, ([count, score]) => score!)
    );
  }

  static async get(month: number, name: string) {
    const sensings = await Sensing.getOneMonth(month, name);

    return new WorkCalender({
      month,
      name,
      sensings,
    });
  }
}
