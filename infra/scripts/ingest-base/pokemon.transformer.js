export function normalizeNames(name) {
  if (typeof name !== "string") return null;

  const specificMappings = {
    Meloetta: "meloetta-aria",
    Zygarde: "zygarde-50",
    "Zacian Crowned Sword": "zacian-crowned",
    "Zamazenta Crowned Shield": "zamazenta-crowned",
    Lycanroc: "lycanroc-midday",
    Wishiwashi: "wishiwashi-solo",
    "Minior Meteor": "minior-red-meteor",
    "Minior Core": "minior-red",
    Darmanitan: "darmanitan-standard",
    "Darmanitan Zen-Mode": "darmanitan-zen",
    "Galarian Darmanitan": "darmanitan-galar-standard",
    "Galarian Darmanitan Zen-Mode": "darmanitan-galar-zen",
  };

  if (specificMappings[name]) {
    return specificMappings[name];
  }

  let normalizedName = name
    .toLowerCase()
    .replace(".", "")
    .replace("size", "")
    .replace("style", "")
    .replace("cloak", "")
    .replace("form", "")
    .replace("mane", "")
    .replace("wings", "")
    .replace("rider", "")
    .replace("♀", "-f")
    .replace("♂", "-m")
    .replace(":", "")
    .replace("%", "")
    .replace("'", "")
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("--", "-");

  if (normalizedName.includes("galarian")) {
    normalizedName = normalizedName.replace("galarian-", "") + "-galar";
  }

  if (normalizedName.includes("alolan")) {
    normalizedName = normalizedName.replace("alolan-", "") + "-alola";
  }

  if (normalizedName.includes("mega")) {
    normalizedName = normalizedName.replace("mega-", "") + "-mega";

    if (normalizedName.includes("-y-mega"))
      normalizedName = normalizedName.replace("-y-mega", "") + "-mega-y";

    if (normalizedName.includes("-x-mega"))
      normalizedName = normalizedName.replace("-x-mega", "") + "-mega-x";
  }

  const prefixes = [
    "small-",
    "average-",
    "large-",
    "super-",
    "black-",
    "white-",
    "primal-",
    "ultra-",
    "dawn-",
    "dusk-",
    "ash-",
    "unbound-",
  ];

  for (const prefix of prefixes) {
    if (normalizedName.startsWith(prefix)) {
      const baseName = normalizedName.replace(prefix, "");
      normalizedName = `${baseName}-${prefix.slice(0, -1)}`;
      break;
    }
  }

  return normalizedName;
}

export function parseAbilities(abilitiesString) {
  if (
    !abilitiesString ||
    typeof abilitiesString !== "string" ||
    abilitiesString === "[]"
  ) {
    return null;
  }

  try {
    const innerString = abilitiesString.slice(1, -1);
    const abilityArray = innerString.split("', '");
    const cleanedArray = abilityArray.map((ability) => {
      return ability.replace(/^'|'$/g, "").trim();
    });
    return cleanedArray;
  } catch (e) {
    console.error(`Failed to parse abilities: ${abilitiesString}`, e);
    return null;
  }
}

function toLowerCaseOrNull(value) {
  return value ? value.toLowerCase() : null;
}

export function formatPokemon(pokemonRow) {
  return {
    name: normalizeNames(pokemonRow.name),
    pokedex_number: pokemonRow.number,
    type_1: toLowerCaseOrNull(pokemonRow.type_1),
    type_2: toLowerCaseOrNull(pokemonRow.type_2),
    abilities: parseAbilities(pokemonRow.abilities),
    hp: parseFloat(pokemonRow.hp),
    att: parseFloat(pokemonRow.att),
    def: parseFloat(pokemonRow.def),
    spa: parseFloat(pokemonRow.spa),
    spd: parseFloat(pokemonRow.spd),
    spe: parseFloat(pokemonRow.spe),
    against_normal: parseFloat(pokemonRow.against_normal),
    against_fire: parseFloat(pokemonRow.against_fire),
    against_water: parseFloat(pokemonRow.against_water),
    against_electric: parseFloat(pokemonRow.against_electric),
    against_grass: parseFloat(pokemonRow.against_grass),
    against_ice: parseFloat(pokemonRow.against_ice),
    against_fighting: parseFloat(pokemonRow.against_fighting),
    against_poison: parseFloat(pokemonRow.against_poison),
    against_ground: parseFloat(pokemonRow.against_ground),
    against_flying: parseFloat(pokemonRow.against_flying),
    against_psychic: parseFloat(pokemonRow.against_psychic),
    against_bug: parseFloat(pokemonRow.against_bug),
    against_rock: parseFloat(pokemonRow.against_rock),
    against_ghost: parseFloat(pokemonRow.against_ghost),
    against_dragon: parseFloat(pokemonRow.against_dragon),
    against_dark: parseFloat(pokemonRow.against_dark),
    against_steel: parseFloat(pokemonRow.against_steel),
    against_fairy: parseFloat(pokemonRow.against_fairy),
  };
}
