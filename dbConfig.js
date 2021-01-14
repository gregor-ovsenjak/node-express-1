const dbEngine = process.env.DB_ENVIORMENT || 'development';
const config  = require('./knexfile.js')[dbEngine];

module.exports = require('knex')(config);