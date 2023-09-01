/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("player", (table) => {
      table.increments();
      table.string("name").notNullable();
    })
    .createTable("club", (table) => {
      table.increments();
      table.string("name").notNullable();
    })
    .createTable("player_of_club", (table) => {
      table.increments();
      table.integer("player_id").unsigned();
      table.integer("club_id").unsigned();

      table
        .foreign("club_id")
        .references("club.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("player_id")
        .references("player.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropSchemaIfExists("player_of_club")
    .dropSchemaIfExists("club")
    .dropSchemaIfExists("players");
};
