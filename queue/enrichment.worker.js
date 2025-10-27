import { Worker } from "bullmq";
import { ENRICHMENT_QUEUE, connectionOpts } from "./connection.js";

const processJob = async (job) => {
  const { pokemonId, pokedexNumber, name } = job.data;

  console.log(
    `[WORKER] Processando: ${name} (ID: ${pokemonId}, Pokedex: ${pokedexNumber})`,
  );

  try {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { success: true, pokemon: name };
  } catch (error) {
    console.error(`[WORKER] Falha ao processar ${name}: ${error.message}`);
    throw error;
  }
};

console.log("Iniciando Smogon Worker...");

const worker = new Worker(ENRICHMENT_QUEUE, processJob, {
  connection: connectionOpts,
  concurrency: 5,
});

worker.on("completed", (job, result) => {
  console.log(`[WORKER] Job ${job.id} ( ${result.pokemon} ) concluído!`);
});

worker.on("failed", (job, err) => {
  console.error(
    `[WORKER] Job ${job.id} ( ${job.data.pokemon_name} ) falhou: ${err.message}`,
  );
});
