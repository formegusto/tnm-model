import { Schema } from "mongoose";
import { ScoreBoardModel } from ".";
import _ from "lodash";

export interface IScoreBoard {
  _id?: Schema.Types.ObjectId | string;
  startTime: number;
  endTime: number;
  score: number;
}

export class ScoreBoard implements IScoreBoard {
  _id?: Schema.Types.ObjectId | string;
  startTime!: number;
  endTime!: number;
  score!: number;

  constructor(scoreBoard: IScoreBoard) {
    Object.assign(this, scoreBoard);
  }

  async save() {
    const scoreBoard = await ScoreBoardModel.create(_.toPlainObject(this));
    return scoreBoard;
  }

  static async saveMany(scoreBoards: IScoreBoard[]) {
    return await ScoreBoardModel.insertMany(scoreBoards);
  }

  static async find(minute: number) {
    const scoreBoard = await ScoreBoardModel.findOne({
      $and: [
        {
          startTime: {
            $lte: minute,
          },
        },
        {
          endTime: {
            $gte: minute,
          },
        },
      ],
    });

    return scoreBoard!.score;
  }
}
