import { pipeline } from "node:stream/promises";
import { createReadStream } from "node:fs";
import csvParser from "csv-parser";
import { FILE_NAME, HIGH_WATER_MARK } from "./config.js";
import { transformAndLoad, devNull } from "./pokemon.stream.js";

const fileStream = createReadStream(FILE_NAME, {
  highWaterMark: HIGH_WATER_MARK,
});

const parser = csvParser({
  mapHeaders: ({ header }) =>
    header.trim().toLowerCase().replace(".", "").replace(" ", "_"),
});

try {
  console.time("Total-Pipeline-Time");

  await pipeline(fileStream, parser, transformAndLoad, devNull);

  console.timeEnd("Total-Pipeline-Time");
  process.exit(1);
} catch (error) {
  console.error("Error during pipeline: ", error);
}
