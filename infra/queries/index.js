export function buildBatchInsertQuery(batchSize) {
  const valueGroups = [];
  let paramIndex = 1;

  for (let i = 0; i < batchSize; i++) {
    const group = [];
    for (let j = 0; j < 30; j++) {
      group.push(`$${paramIndex++}`);
    }
    valueGroups.push(`(${group.join(", ")})`);
  }

  return `
        INSERT INTO pokemon (
          name, pokedex_number, type_1, type_2, hp, att, def, spa, spd, spe, abilities, image_url,
          against_normal, against_fire, against_water, against_electric,
          against_grass, against_ice, against_fighting, against_poison,
          against_ground, against_flying, against_psychic, against_bug,
          against_rock, against_ghost, against_dragon, against_dark,
          against_steel, against_fairy
        )
        VALUES ${valueGroups.join(", ")}
        RETURNING id, name, pokedex_number, type_1, type_2;
      `;
}

export function buildBatchPokeTypeInsertQuery(batchSize) {
  const valueGroups = [];
  let paramIndex = 1;

  for (let i = 0; i < batchSize; i++) {
    valueGroups.push(`($${paramIndex++}, $${paramIndex++})`);
  }

  return `
        INSERT INTO pokemon_types (pokemon_id, type_id)
        VALUES ${valueGroups.join(", ")};
      `;
}
