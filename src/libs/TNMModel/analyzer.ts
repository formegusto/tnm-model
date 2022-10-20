import { TNMModel } from ".";

export interface ITNMAnalyzer {
  prev: TNMModel;
  now: TNMModel;
}

export class TNMAnalyzer implements ITNMAnalyzer {
  prev!: TNMModel;
  now!: TNMModel;

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

    return new TNMAnalyzer({
      prev,
      now,
    });
  }
}
