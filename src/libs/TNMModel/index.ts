import _ from "lodash";
import { Human } from "../../models/types";
import { getLinspace } from "../../utils";
import { WorkCalender } from "../WorkCalender";
import { TNMModelColumns } from "./common";
import { TNMColumns, TNMTable } from "./types";

export * from "./analyzer";

export interface ITNMModel {
  month: number;
  calenders: WorkCalender[];
  weight: [time: number, number: number, magnitude: number];
  scoreSize: number;
}

export class TNMModel implements ITNMModel {
  month!: number;
  calenders!: WorkCalender[];
  weight!: [time: number, number: number, magnitude: number];
  scoreSize!: number;

  constructor(tnmmodel: ITNMModel) {
    Object.assign(this, tnmmodel);
  }

  static async get(
    month: number,
    _weight?: [time: number, number: number, magnitude: number],
    _scoreSize?: number
  ) {
    const weight: [time: number, number: number, magnitude: number] = _weight
      ? _weight
      : [1, 1, 1];
    const scoreSize: number = _scoreSize ? _scoreSize : 3;
    const humans = await Human.getNameList();
    const calenders: WorkCalender[] = [];

    for (let h of humans) calenders.push(await WorkCalender.get(month, h));

    return new TNMModel({
      month,
      calenders,
      weight,
      scoreSize,
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

  get scoreTable(): TNMTable[] {
    const scoreTable: TNMTable[] = [];
    const tnmModel = this.tnmModel;

    const names = _.map(tnmModel, ({ name }) => name);
    const targetKeys: TNMColumns[] = ["time", "number", "magnitude"];
    let tnmArr = [];
    for (let key of targetKeys) {
      const values = _.map(tnmModel, (_tnmModel) => _tnmModel[key]) as number[];
      const min = _.min(values);
      const max = _.max(values);

      const lins = getLinspace(min!, max!, this.scoreSize + 1);
      const scoreLins = _.take(lins, this.scoreSize);
      const normValues: number[] = [];

      for (let v of values) {
        const maxLin = _.max(_.filter(scoreLins, (value) => v >= value));
        const score = _.findIndex(scoreLins, (value) => value === maxLin) + 1;
        normValues.push(score);
      }
      tnmArr.push(normValues);
    }

    const unzip = _.unzip(tnmArr);
    const tnmValues = _.map(unzip, _.sum);
    tnmArr.push(tnmValues);
    tnmArr = _.unzip(_.concat([names], tnmArr));

    for (let tnm of tnmArr)
      scoreTable.push(_.zipObject(TNMModelColumns, tnm) as TNMTable);

    return scoreTable;
  }
}
