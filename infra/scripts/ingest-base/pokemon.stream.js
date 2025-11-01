import { Writable } from "node:stream";
import { formatPokemon } from "./pokemon.transformer.js";
import { createPokemonBatch } from "./pokemon.service.js";
import { BATCH_SIZE } from "./config.js";

async function* transformAndLoad(source) {
  let batch = [];

  for await (const row of source) {
    const pokemon = formatPokemon(row);
    batch.push(pokemon);

    if (batch.length === BATCH_SIZE - 1) {
      await createPokemonBatch(batch);
      batch = [];
    }

    yield pokemon;
  }

  if (batch.length > 0) {
    await createPokemonBatch(batch);
  }
}

const devNull = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    callback();
  },
});

export { transformAndLoad, devNull };
