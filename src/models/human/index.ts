import { model, Schema } from "mongoose";
import { IHuman } from "./types";

const HumanSchema = new Schema<IHuman>(
  {
    name: { type: String, reqiured: true },
  },
  {
    timestamps: false,
    collection: "Human",
    versionKey: false,
  }
);

export const HumanModel = model<typeof HumanSchema>("human", HumanSchema);
