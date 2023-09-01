module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'players',
      user: 'admin',
      password: 'admin'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds:{
      directory: './data/seeds'
    }
  },
  production:{}
}