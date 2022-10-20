import { tnm } from "./examples";
import { dbConnect, dbDisconnect } from "./models/connect";

(async function () {
  await dbConnect();

  await tnm();

  await dbDisconnect();
})();
