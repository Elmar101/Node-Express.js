const knex = require('knex');

const knexFile = require('../knexFile');

const environment = process.env.DB_ENV || "development";

module.exports = knex(knexFile[environment]);