export type TNMColumns = "name" | "time" | "number" | "magnitude" | "tnmValue";
export type TNMTable = {
  [key in TNMColumns]: string | number;
};
