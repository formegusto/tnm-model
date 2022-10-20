import fs from "fs";
import _ from "lodash";
import { PSensings, SensingBuilder } from "../models/builder";
import {
  Human,
  IHuman,
  ISchedule,
  IScoreBoard,
  Schedule,
  ScoreBoard,
  Sensing,
} from "../models/types";

export async function saveExample() {
  const fEmployees = fs.readFileSync("./datas/admin_employees.json", {
    encoding: "utf-8",
  });
  const employees: IHuman[] = JSON.parse(fEmployees.toString());
  await Human.saveMany(employees);

  const fSchedules = fs.readFileSync("./datas/admin_schedule.json", {
    encoding: "utf-8",
  });
  const schedules: ISchedule[] = JSON.parse(fSchedules.toString());
  await Schedule.saveMany(schedules);

  const fScores = fs.readFileSync("./datas/admin_scoreboard.json", {
    encoding: "utf-8",
  });
  const scores: IScoreBoard[] = JSON.parse(fScores.toString());
  await ScoreBoard.saveMany(scores);

  for (let f of [
    "emp1_09.json",
    "emp2_09.json",
    "emp3_09.json",
    "emp1_10.json",
    "emp3_10.json",
  ]) {
    const fSensing = fs.readFileSync(`./datas/${f}`, {
      encoding: "utf-8",
    });
    const sensing: PSensings = JSON.parse(fSensing.toString());
    const name = sensing.name;
    const sensings: (Sensing | undefined)[] = await Promise.all(
      _.map(
        sensing.sensings,
        async (s) => await SensingBuilder.get({ name, sensing: s })
      )
    );
    for (let s of sensings) await s?.save();
  }
}
