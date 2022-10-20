import { Schema } from "mongoose";

export interface IHuman {
  _id?: Schema.Types.ObjectId | string;
  name: string;
}
