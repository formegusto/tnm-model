import _ from "lodash";
import { WorkCalender } from "../libs";

export async function calenderTest() {
  const cal = await WorkCalender.get(10, "직원 2");

  console.log(cal.dayGroupScore);

  return;
}
