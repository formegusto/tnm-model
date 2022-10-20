import { TNMModel } from "../libs";

export async function tnm() {
  const month = 9;
  const tnm = await TNMModel.get(month);

  console.log(tnm.scoreTable);

  return;
}
