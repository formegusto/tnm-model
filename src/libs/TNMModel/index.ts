import _ from "lodash";
import { Human } from "../../models/types";
import { WorkCalender } from "../WorkCalender";
import { TNMModelColumns } from "./common";
import { TNMTable } from "./types";

export interface ITNMModel {
  month: number;
  calenders: WorkCalender[];
  weight: [time: number, number: number, magnitude: number];
}

export class TNMModel implements ITNMModel {
  month!: number;
  calenders!: WorkCalender[];
  weight!: [time: number, number: number, magnitude: number];

  constructor(tnmmodel: ITNMModel) {
    Object.assign(this, tnmmodel);
  }

  static async get(
    month: number,
    _weight?: [time: number, number: number, magnitude: number]
  ) {
    const weight: [time: number, number: number, magnitude: number] = _weight
      ? _weight
      : [1, 1, 1];
    const humans = await Human.getNameList();
    const calenders: WorkCalender[] = [];

    for (let h of humans) {
      calenders.push(await WorkCalender.get(month, h));
    }

    return new TNMModel({
      month,
      calenders,
      weight,
    });
  }

  get tnmModel(): TNMTable[] {
    const tnmTable: TNMTable[] = [];

    for (let calender of this.calenders) {
      const dayGroupScore = calender.dayGroupScore;
      const days = _.map(_.keys(dayGroupScore), (key) => parseInt(key));
      const scores = _.values(dayGroupScore);

      const time = _.max(days);
      const number = days.length;
      const magnitude = _.sum(scores);

      const weightAndTNM = _.zip([time, number, magnitude], this.weight);
      const tnm = _.map(weightAndTNM, (v) =>
        _.multiply.apply(null, v as [number, number])
      );
      const tnmValue = _.sum(tnm);

      const _tnmTable = _.zipObject(TNMModelColumns, [
        calender.name,
        ...tnm,
        tnmValue,
      ]) as TNMTable;

      tnmTable.push(_tnmTable);
    }
    return tnmTable;
  }
}
