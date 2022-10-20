import { model, Schema } from "mongoose";
import { IScoreBoard } from "./types";

const ScoreBoardSchema = new Schema<IScoreBoard>(
  {
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: false,
    collection: "ScoreBoard",
    versionKey: false,
  }
);

export const ScoreBoardModel = model<typeof ScoreBoardSchema>(
  "ScoreBoard",
  ScoreBoardSchema
);
