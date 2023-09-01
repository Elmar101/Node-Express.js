/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('club').del()
  await knex('club').insert([
    {id: 1, name: 'Barselona'},
    {id: 2, name: 'Psj'},
    {id: 3, name: 'Real'}
  ]);
};
