import { Schema } from "mongoose";
import _ from "lodash";
import { HumanModel } from ".";

export interface IHuman {
  _id?: Schema.Types.ObjectId | string;
  name: string;
}

export class Human implements IHuman {
  _id?: Schema.Types.ObjectId | string;
  name: string;

  constructor(name: string, _id?: Schema.Types.ObjectId | string) {
    this.name = name;
    this._id = _id;
  }

  static getFromDocument(document: IHuman) {
    return new Human(document.name, document._id);
  }

  async save() {
    const human = await HumanModel.create(_.toPlainObject(this));
    return human;
  }

  static async findByName(name: string) {
    const humanDocs = await HumanModel.findOne({ name });
    if (humanDocs) return Human.getFromDocument(humanDocs);
    return;
  }
}
