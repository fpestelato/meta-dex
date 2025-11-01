import { addPokemonEnrichmentJob } from "../../../queue/enrichment.queue.js";
import { saveBatchInTransaction } from "./pokemon.repository.js";

export async function createPokemonBatch(pokemons) {
  const insertedPokemons = await saveBatchInTransaction(pokemons);
  const enrichmentJobs = insertedPokemons.rows.map((pokemon) =>
    addPokemonEnrichmentJob(pokemon),
  );

  Promise.all(enrichmentJobs);
}
