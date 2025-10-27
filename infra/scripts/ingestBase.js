import { pipeline } from "node:stream/promises";
import { Writable } from "node:stream";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "node:path";
import csvParser from "csv-parser";
import { formatPokemon } from "./pokemonTransformer.js";
import pool from "../database.js";
import {
  upsertTypeQuery,
  insertPokemonQuery,
  insertPokemonTypeQuery,
} from "../queries/index.js";
import enrichmentQueue from "../../queue/enrichment.queue.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_NAME = path.join(__dirname, "../../data/all_pokemons.csv");

const fileStream = createReadStream(FILE_NAME, {
  highWaterMark: 64 * 1024,
});

const parser = csvParser({
  mapHeaders: ({ header }) =>
    header.trim().toLowerCase().replace(".", "").replace(" ", "_"),
});

async function* transformAndLoad(source) {
  async function upsertType(client, query, type) {
    if (!type) return null;
    const result = await client.query(query, [type]);
    return getId(result);
  }

  async function insertPokemonType(client, query, pokemonId, typeId) {
    if (!typeId || !pokemonId) return;
    await client.query(query, [pokemonId, typeId]);
  }

  function getId(queryResult) {
    if (queryResult.rows.length === 0) return null;

    return queryResult.rows[0].id;
  }

  for await (const row of source) {
    const pokemon = formatPokemon(row);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const pokemonId = getId(
        await client.query(insertPokemonQuery, [
          pokemon.name,
          pokemon.pokedex_number,
          pokemon.type_1,
          pokemon.type_2,
          pokemon.hp,
          pokemon.att,
          pokemon.def,
          pokemon.spa,
          pokemon.spd,
          pokemon.spe,
          pokemon.abilities,
          pokemon.against_normal,
          pokemon.against_fire,
          pokemon.against_water,
          pokemon.against_electric,
          pokemon.against_grass,
          pokemon.against_ice,
          pokemon.against_fighting,
          pokemon.against_poison,
          pokemon.against_ground,
          pokemon.against_flying,
          pokemon.against_psychic,
          pokemon.against_bug,
          pokemon.against_rock,
          pokemon.against_ghost,
          pokemon.against_dragon,
          pokemon.against_dark,
          pokemon.against_steel,
          pokemon.against_fairy,
        ]),
      );

      const type1Id = await upsertType(client, upsertTypeQuery, pokemon.type_1);
      const type2Id = await upsertType(client, upsertTypeQuery, pokemon.type_2);

      await insertPokemonType(
        client,
        insertPokemonTypeQuery,
        pokemonId,
        type1Id,
      );

      await insertPokemonType(
        client,
        insertPokemonTypeQuery,
        pokemonId,
        type2Id,
      );

      await enrichmentQueue.add("enrich-pokemon", {
        pokemonId,
        pokedexNumber: pokemon.pokedex_number,
        name: pokemon.name,
      });

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(
        `Failed to process ${pokemon.name} import. Rollback. Error: ${err.message}`,
      );
    } finally {
      client.release();
    }

    yield pokemon;
  }
}

const devNull = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    callback();
  },
});

try {
  console.time("Total-Pipeline-Time");
  await pipeline(fileStream, parser, transformAndLoad, devNull);
  console.timeEnd("Total-Pipeline-Time");
  console.log("Pipeline finished");
  process.exit(1);
} catch (error) {
  console.error("Error during pipeline: ", error);
}
