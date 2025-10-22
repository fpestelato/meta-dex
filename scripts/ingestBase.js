import { pipeline } from "node:stream/promises";
import { Writable } from "node:stream";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "node:path";
import csvParser from "csv-parser";
import { formatPokemon } from "./pokemonTransformer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_NAME = path.join(__dirname, "../data/all_pokemons.csv");

const fileStream = createReadStream(FILE_NAME, {
  highWaterMark: 64 * 1024,
});

const parser = csvParser({
  mapHeaders: ({ header }) =>
    header.trim().toLowerCase().replace(".", "").replace(" ", "_"),
});

async function* transformAndLoad(source) {
  for await (const row of source) {
    const cleanPokemon = formatPokemon(row);
    console.log(cleanPokemon);
    yield row;
  }
}

const devNull = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    callback();
  },
});

try {
  await pipeline(fileStream, parser, transformAndLoad, devNull);
  console.log("Pipeline finished");
} catch (error) {
  console.error("Error during pipeline: ", error);
}
