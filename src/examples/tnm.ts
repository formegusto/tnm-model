import { TNMAnalyzer, TNMModel } from "../libs";

export async function tnm() {
  const month = 9;
  const tnm = await TNMModel.get(month);

  console.log(tnm.scoreTable);

  return;
}

export async function tnmAnalyzer() {
  const month = 10;
  const analyzer = await TNMAnalyzer.get(month);

  console.log(analyzer.tnmModel);
  console.log(analyzer.scoreTable);

  return;
}
