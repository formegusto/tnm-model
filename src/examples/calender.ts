import _ from "lodash";
import { WorkCalender } from "../libs";

export async function calenderExample() {
  const cal = await WorkCalender.get(9, "직원 1");
  console.log(cal.dayGroupScore);
}
