import { TNMAnalyzer, TNMModel } from "../libs";

export async function tnmExample() {
  const month = 9;
  const tnm = await TNMModel.get(month);

  console.log(tnm.scoreTable);
}

export async function tnmAnalyzerExample() {
  const month = 10;
  const analyzer = await TNMAnalyzer.get(month);

  console.log(analyzer.tnmModel);
  console.log(analyzer.scoreTable);
}
