import { saveExample } from "./examples/saveTest";
import { dbConnect, dbDisconnect } from "./models/connect";

(async function () {
  await dbConnect();

  await saveExample();

  await dbDisconnect();
})();
