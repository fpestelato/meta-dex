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
  pgm.sql(`
    INSERT INTO types (name)
    VALUES
      ('normal'),
      ('fire'),
      ('water'),
      ('electric'),
      ('grass'),
      ('ice'),
      ('fighting'),
      ('poison'),
      ('ground'),
      ('flying'),
      ('psychic'),
      ('bug'),
      ('rock'),
      ('ghost'),
      ('dragon'),
      ('dark'),
      ('steel'),
      ('fairy')
    ON CONFLICT (name) DO NOTHING;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
