import {
  buildBatchInsertQuery,
  buildBatchPokeTypeInsertQuery,
} from "../../queries/index.js";
import pool from "../../database.js";
import { TYPES_MAP } from "./config.js";

function _mapPokemonToParamsArray(pokemon) {
  return [
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
    null,
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
  ];
}

async function _insertPokemonTypes(client, insertedPokemons) {
  const batchPokeTypeParams = [];

  for (const pokemon of insertedPokemons.rows) {
    batchPokeTypeParams.push({
      pokemonId: pokemon.id,
      typeName: pokemon.type_1,
    });

    if (pokemon.type_2) {
      batchPokeTypeParams.push({
        pokemonId: pokemon.id,
        typeName: pokemon.type_2,
      });
    }
  }

  if (batchPokeTypeParams.length === 0) return;

  const batchInsertPokeTypeQuery = buildBatchPokeTypeInsertQuery(
    batchPokeTypeParams.length,
  );

  await client.query(
    batchInsertPokeTypeQuery,
    batchPokeTypeParams
      .map(({ pokemonId, typeName }) => [
        pokemonId,
        TYPES_MAP[typeName.toLowerCase()],
      ])
      .flat(),
  );
}

async function _insertPokemons(client, batch) {
  const batchInsertPokemonQuery = buildBatchInsertQuery(batch.length);
  const pokemonParams = batch.map(_mapPokemonToParamsArray).flat();
  return await client.query(batchInsertPokemonQuery, pokemonParams);
}

async function saveBatchInTransaction(batch) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertedPokemons = await _insertPokemons(client, batch);
    await _insertPokemonTypes(client, insertedPokemons);

    client.query("COMMIT");
    return insertedPokemons;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error saving pokemon batch:", err);
    throw err;
  } finally {
    client.release();
  }
}

export { saveBatchInTransaction };
