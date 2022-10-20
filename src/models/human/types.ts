import { Schema } from "mongoose";
import _ from "lodash";
import { HumanModel } from ".";

export interface IHuman {
  _id?: Schema.Types.ObjectId | string;
  name: string;
}

export class Human implements IHuman {
  _id?: Schema.Types.ObjectId | string;
  name!: string;

  constructor(human: IHuman) {
    Object.assign(this, human);
  }

  async save() {
    const human = await HumanModel.create(_.toPlainObject(this));
    return human;
  }

  static async saveMany(humans: IHuman[]) {
    return await HumanModel.insertMany(humans);
  }

  static async findByName(name: string) {
    const humanDocs = await HumanModel.findOne({ name });
    if (humanDocs) return new Human(humanDocs.toObject());
    return;
  }

  static async findById(id: Schema.Types.ObjectId | string) {
    const humanDocs = await HumanModel.findById(id);
    if (humanDocs) return new Human(humanDocs.toObject());
    return;
  }

  static async getNameList() {
    const humans = await HumanModel.find({});
    return _.map(humans, ({ name }) => name);
  }
}
