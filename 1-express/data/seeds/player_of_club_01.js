/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('player_of_club').del()
  await knex('player_of_club').insert([
    {player_id: 1, club_id: 1},
    {player_id: 2, club_id: 2},
    {player_id: 3, club_id: 3}
  ]);
};
