import {
  calenderExample,
  saveExample,
  tnmAnalyzerExample,
  tnmExample,
} from "./examples";
import { dbConnect, dbDisconnect } from "./models/connect";

(async function () {
  await dbConnect();

  await saveExample();
  await calenderExample();
  await tnmExample();
  await tnmAnalyzerExample();

  await dbDisconnect();
})();
