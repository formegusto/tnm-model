import _ from "lodash";
import { TNMModel } from ".";
import { tnm } from "../../examples";
import { TNMAnalyzerTable, TNMTable } from "./types";

export interface ITNMAnalyzer {
  prev: TNMModel;
  now: TNMModel;

  merge: TNMModel;
}

export class TNMAnalyzer implements ITNMAnalyzer {
  prev!: TNMModel;
  now!: TNMModel;

  merge!: TNMModel;

  constructor(analyzer: ITNMAnalyzer) {
    Object.assign(this, analyzer);
  }

  static async get(
    month: number,
    _weight?: [time: number, number: number, magnitude: number],
    _scoreSize?: number
  ) {
    const prevMonth = month - 1;

    const prev = await TNMModel.get(prevMonth, _weight, _scoreSize);
    const now = await TNMModel.get(month, _weight, _scoreSize);
    const calenders = _.concat(prev.calenders, now.calenders);

    _.forEach(calenders, (c) => {
      c.name = `${c.name}_${c.month}월`;
    });
    const merge = new TNMModel({
      month,
      calenders,
      weight: now.weight,
      scoreSize: now.scoreSize,
    });

    return new TNMAnalyzer({
      prev,
      now,
      merge,
    });
  }

  get tnmModel(): TNMTable[] {
    return this.merge.tnmModel;
  }

  get scoreTable(): TNMAnalyzerTable[] {
    const scoreTable: TNMTable[] = this.merge.scoreTable;

    const prevTable = _.filter(scoreTable, ({ name }) =>
      (name as string).includes(`${this.prev.month}월`)
    );
    const nowTable = _.filter(scoreTable, ({ name }) =>
      (name as string).includes(`${this.now.month}월`)
    );

    const impValues: number[] = [];
    for (let t of nowTable) {
      const name = (t.name as string).split("_")[0];
      const prevRow = _.find(prevTable, ({ name: pname }) =>
        (pname as string).includes(name as string)
      );
      const prevValues = _.values(
        _.pick(prevRow, ["time", "number", "magnitude"])
      );
      const nowValues = _.values(_.pick(t, ["time", "number", "magnitude"]));

      const zip = _.zip(prevValues, nowValues);
      const impValue = Math.sqrt(
        _.sum(
          _.map(zip, (v: [number, number]) => _.subtract.apply(null, v) ** 2)
        )
      );
      impValues.push(impValue);
    }

    const analyzerTable = _.map(nowTable, (t, idx) => ({
      ...t,
      impValue: impValues[idx],
    })) as TNMAnalyzerTable[];

    return analyzerTable;
  }
}
