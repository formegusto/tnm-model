import { model, Schema } from "mongoose";
import { IScoreBoard } from "./types";

const ScoreBoardSchema = new Schema<IScoreBoard>(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    score: { Type: Number, required: true },
  },
  {
    timestamps: false,
    collection: "ScoreBoard",
    versionKey: false,
  }
);

export const SchoreBoardModel = model<typeof ScoreBoardSchema>(
  "ScoreBoard",
  ScoreBoardSchema
);
