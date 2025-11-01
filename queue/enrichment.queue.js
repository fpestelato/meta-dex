import { Queue } from "bullmq";
import { ENRICHMENT_QUEUE, connectionOpts } from "./connection.js";

const enrichmentQueue = new Queue(ENRICHMENT_QUEUE, {
  connection: connectionOpts,
});

function addPokemonEnrichmentJob(pokemon) {
  enrichmentQueue.add("enrich-pokemon", {
    pokemonId: pokemon.id,
    name: pokemon.name,
    pokedexNumber: pokemon.pokedex_number,
  });
}

export { addPokemonEnrichmentJob };
