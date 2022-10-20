export type TNMColumns = "name" | "time" | "number" | "magnitude" | "tnmValue";
export type TNMTable = {
  [key in TNMColumns]: string | number;
};
export interface TNMAnalyzerTable extends TNMTable {
  impValue: number;
}

export type NormTNMTable = [
  times: number[],
  numbers: number[],
  maginitudes: number[]
];
