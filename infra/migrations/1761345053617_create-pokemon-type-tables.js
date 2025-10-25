/* eslint-disable no-unused-vars */
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  /* ---------------------------------------------------------- */
  /* POKEMON TABLE */
  /* ---------------------------------------------------------- */

  pgm.createTable("pokemon", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: { type: "varchar(100)", notNull: true, unique: true },
    pokedex_number: { type: "int", notNull: true },
    type_1: { type: "varchar(50)", notNull: true },
    type_2: { type: "varchar(50)", notNull: false },
    hp: { type: "int", notNull: true },
    att: { type: "int", notNull: true },
    def: { type: "int", notNull: true },
    spa: { type: "int", notNull: true },
    spd: { type: "int", notNull: true },
    spe: { type: "int", notNull: true },
    abilities: { type: "text[]", notNull: false },
    image_url: { type: "varchar(255)", notNull: false },
    against_normal: { type: "real", notNull: true, default: 1 },
    against_fire: { type: "real", notNull: true, default: 1 },
    against_water: { type: "real", notNull: true, default: 1 },
    against_electric: { type: "real", notNull: true, default: 1 },
    against_grass: { type: "real", notNull: true, default: 1 },
    against_ice: { type: "real", notNull: true, default: 1 },
    against_fighting: { type: "real", notNull: true, default: 1 },
    against_poison: { type: "real", notNull: true, default: 1 },
    against_ground: { type: "real", notNull: true, default: 1 },
    against_flying: { type: "real", notNull: true, default: 1 },
    against_psychic: { type: "real", notNull: true, default: 1 },
    against_bug: { type: "real", notNull: true, default: 1 },
    against_rock: { type: "real", notNull: true, default: 1 },
    against_ghost: { type: "real", notNull: true, default: 1 },
    against_dragon: { type: "real", notNull: true, default: 1 },
    against_dark: { type: "real", notNull: true, default: 1 },
    against_steel: { type: "real", notNull: true, default: 1 },
    against_fairy: { type: "real", notNull: true, default: 1 },
  });

  pgm.createIndex("pokemon", "name");
  pgm.createIndex("pokemon", "pokedex_number");

  /* ---------------------------------------------------------- */
  /* TYPES TABLE */
  /* ---------------------------------------------------------- */

  pgm.createTable("types", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: { type: "varchar(50)", notNull: true, unique: true },
  });

  /* ---------------------------------------------------------- */
  /* POKEMONS_TYPES TABLE */
  /* ---------------------------------------------------------- */
  pgm.createTable("pokemon_types", {
    pokemon_id: {
      type: "int",
      notNull: true,
      references: '"pokemon"(id)',
      onDelete: "CASCADE",
    },
    type_id: {
      type: "int",
      notNull: true,
      references: '"types"(id)',
      onDelete: "CASCADE",
    },
  });
  pgm.addConstraint("pokemon_types", "pokemon_types_pkey", {
    primaryKey: ["pokemon_id", "type_id"],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
