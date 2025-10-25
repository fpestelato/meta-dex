export const insertPokemonQuery = `
        INSERT INTO pokemon (
          name, pokedex_number, type_1, type_2, hp, att, def, spa, spd, spe,
          abilities, image_url,
          against_normal, against_fire, against_water, against_electric,
          against_grass, against_ice, against_fighting, against_poison,
          against_ground, against_flying, against_psychic, against_bug,
          against_rock, against_ghost, against_dragon, against_dark,
          against_steel, against_fairy
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, null,
          $12, $13, $14, $15, $16, $17, $18, $19,
          $20, $21, $22, $23, $24, $25, $26, $27,
          $28, $29
        )
        RETURNING id;
      `;

// NOTE: not the best performant option, but it's flexible to future types additions
export const upsertTypeQuery = `
        INSERT INTO types (name) VALUES ($1)
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING id;
      `;

export const insertPokemonTypeQuery = `
        INSERT INTO pokemon_types (pokemon_id, type_id) VALUES ($1, $2);
      `;
