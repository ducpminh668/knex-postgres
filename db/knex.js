const evironment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[evironment];

module.exports = require('knex')(config);
