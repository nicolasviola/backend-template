module.exports = {
  API_PORT: process.env.API_PORT || 5000,
  MLAB_MONGO_DB: process.env.ATLAS_MONGO_DB_TEST || '',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'SushiHomeRolls',
}
