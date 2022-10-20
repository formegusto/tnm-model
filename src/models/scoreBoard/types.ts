import { Schema } from "mongoose";

export interface IScoreBoard {
  _id?: Schema.Types.ObjectId | string;
  startTime: Date;
  endTime: Date;
  score: number;
}
