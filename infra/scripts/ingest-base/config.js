import { fileURLToPath } from "url";
import { join, dirname } from "node:path";

const TYPES_MAP = {
  normal: 1,
  fire: 2,
  water: 3,
  electric: 4,
  grass: 5,
  ice: 6,
  fighting: 7,
  poison: 8,
  ground: 9,
  flying: 10,
  psychic: 11,
  bug: 12,
  rock: 13,
  ghost: 14,
  dragon: 15,
  dark: 16,
  steel: 17,
  fairy: 18,
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FILE_NAME = join(__dirname, "../../../data/all_pokemons.csv");

const BATCH_SIZE = 500;
const HIGH_WATER_MARK = 64 * 1024;

export { FILE_NAME, BATCH_SIZE, HIGH_WATER_MARK, TYPES_MAP };
