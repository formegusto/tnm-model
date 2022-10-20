import { calenderTest } from "./examples";
import { dbConnect, dbDisconnect } from "./models/connect";

(async function () {
  await dbConnect();

  await calenderTest();

  await dbDisconnect();
})();
