import { Queue } from "bullmq";
import { ENRICHMENT_QUEUE, connectionOpts } from "./connection.js";

const enrichmentQueue = new Queue(ENRICHMENT_QUEUE, {
  connection: connectionOpts,
});

export default enrichmentQueue;
