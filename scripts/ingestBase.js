import { pipeline } from "node:stream/promises";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_NAME = path.join(__dirname, "../data/all_pokemons.csv");

const fileStream = createReadStream(FILE_NAME, {
  highWaterMark: 64 * 1024,
});

try {
  await pipeline(fileStream, process.stdout);
  console.log("Pipeline finished");
} catch (error) {
  console.error("Error during pipeline: ", error);
}
