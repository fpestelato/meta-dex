import { describe, it, expect } from "@jest/globals";
import {
  formatPokemon,
  normalizeNames,
} from "@/infra/scripts/pokemonTransformer.js";

describe("parseAbilities", () => {
  it("should set type_2 to null when empty and parse abilities for Squirtle", () => {
    const squirtleRow = {
      name: "Squirtle",
      number: "7",
      type_1: "Water",
      type_2: "",
      abilities: "['Rain Dish', 'Torrent']",
      hp: "44",
      att: "48",
      def: "65",
      spa: "50",
      spd: "64",
      spe: "43",
      against_normal: "1.0",
      against_fire: "0.5",
      against_water: "0.5",
      against_electric: "2.0",
      against_grass: "2.0",
      against_ice: "0.5",
      against_fighting: "1.0",
      against_poison: "1.0",
      against_ground: "1.0",
      against_flying: "1.0",
      against_psychic: "1.0",
      against_bug: "1.0",
      against_rock: "1.0",
      against_ghost: "1.0",
      against_dragon: "1.0",
      against_dark: "1.0",
      against_steel: "1.0",
      against_fairy: "0.5",
    };

    const formatted = formatPokemon(squirtleRow);

    expect(formatted.type_2).toBeNull();
    expect(formatted.abilities).toEqual(["Rain Dish", "Torrent"]);
  });
});

describe("normalizeNames", () => {
  const edgeCaseNames = {
    "Alolan Meowth": "meowth-alola",
    "Galarian Meowth": "meowth-galar",
    "Mega Charizard Y": "charizard-mega-y",
    "Mega Charizard X": "charizard-mega-x",
    "Mega Beedrill": "beedrill-mega",
    "Thundurus-Therian": "thundurus-therian",
    Meloetta: "meloetta-aria",
    "Meloetta-Pirouette": "meloetta-pirouette",
    "Ash-Greninja": "greninja-ash",
    "Small Size Pumpkaboo": "pumpkaboo-small",
    "Average Size Pumpkaboo": "pumpkaboo-average",
    "Large Size Pumpkaboo": "pumpkaboo-large",
    "Super Size Pumpkaboo": "pumpkaboo-super",
    "Small Size Gourgeist": "gourgeist-small",
    "Average Size Gourgeist": "gourgeist-average",
    "Large Size Gourgeist": "gourgeist-large",
    "Super Size Gourgeist": "gourgeist-super",
    "Zygarde 10%": "zygarde-10",
    Zygarde: "zygarde-50",
    "Zygarde Complete": "zygarde-complete",
    "Mr. Mime": "mr-mime",
    "Galarian Mr. Mime": "mr-mime-galar",
    "Mr. Rime": "mr-rime",
    "Mime Jr.": "mime-jr",
    "Calyrex Ice Rider": "calyrex-ice",
    "Calyrex Shadow Rider": "calyrex-shadow",
    "Nidoran♀": "nidoran-f",
    "Nidoran♂": "nidoran-m",
    "Black Kyurem": "kyurem-black",
    "White Kyurem": "kyurem-white",
    "Zacian Crowned Sword": "zacian-crowned",
    "Zamazenta Crowned Shield": "zamazenta-crowned",
    "Urshifu Rapid Strike Style": "urshifu-rapid-strike",
    "Urshifu Single Strike Style": "urshifu-single-strike",
    "Aegislash Shield Form": "aegislash-shield",
    "Aegislash Blade Form": "aegislash-blade",
    "Oricorio Baile Style": "oricorio-baile",
    "Oricorio Pom-Pom Style": "oricorio-pom-pom",
    "Oricorio Pa'u Style": "oricorio-pau",
    "Oricorio Sensu Style": "oricorio-sensu",
    Lycanroc: "lycanroc-midday",
    "Lycanroc Midnight": "lycanroc-midnight",
    "Lycanroc Dusk": "lycanroc-dusk",
    Wishiwashi: "wishiwashi-solo",
    "Wishiwashi School": "wishiwashi-school",
    "Minior Meteor": "minior-red-meteor",
    "Minior Core": "minior-red",
    Darmanitan: "darmanitan-standard",
    "Darmanitan Zen-Mode": "darmanitan-zen",
    "Galarian Darmanitan": "darmanitan-galar-standard",
    "Galarian Darmanitan Zen-Mode": "darmanitan-galar-zen",
    "Wormadam Plant Cloak": "wormadam-plant",
    "Wormadam Sandy Cloak": "wormadam-sandy",
    "Wormadam Trash Cloak": "wormadam-trash",
    "Deoxys Normal Form": "deoxys-normal",
    "Deoxys Attack Form": "deoxys-attack",
    "Deoxys Defense Form": "deoxys-defense",
    "Deoxys Speed Form": "deoxys-speed",
    "Primal Groudon": "groudon-primal",
    "Primal Kyogre": "kyogre-primal",
    "Ho-Oh": "ho-oh",
    Rotom: "rotom",
    "Rotom-Wash": "rotom-wash",
    "Rotom-Heat": "rotom-heat",
    "Rotom-Mow": "rotom-mow",
    "Rotom-Frost": "rotom-frost",
    "Rotom-Fan": "rotom-fan",
    "Type: Null": "type-null",
    Hoopa: "hoopa",
    "Hoopa Unbound": "hoopa-unbound",
    Necrozma: "necrozma",
    "Dusk Mane Necrozma": "necrozma-dusk",
    "Dawn Wings Necrozma": "necrozma-dawn",
    "Ultra Necrozma": "necrozma-ultra",
  };

  Object.entries(edgeCaseNames).forEach(([raw, slug]) => {
    it(`should normalize "${raw}" -> "${slug}"`, () => {
      const actual = normalizeNames ? normalizeNames(raw) : undefined;
      expect(actual).toBe(slug);
    });
  });
});
