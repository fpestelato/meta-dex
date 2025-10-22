function correctMegaNames(name) {
  if (typeof name !== "string") return null;

  if (name.includes("Mega ")) {
    const parts = name.split(" ");
    if (parts.length > 2 && parts[1] === "Mega") {
      return `${parts[1]} ${parts[0]}`;
    }
  }
  return name.trim();
}

function parseAbilities(abilitiesString) {
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

export function formatPokemon(pokemonRow) {
  return {
    number: pokemonRow.number,
    name: correctMegaNames(pokemonRow.name),
    type_1: pokemonRow.type_1,
    type_2: pokemonRow.type_2 || null,
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
    image_url: null,
  };
}
