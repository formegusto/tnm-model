import { tnmAnalyzer } from "./examples";
import { dbConnect, dbDisconnect } from "./models/connect";

(async function () {
  await dbConnect();

  await tnmAnalyzer();

  await dbDisconnect();
})();
