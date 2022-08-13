require("dotenv").config();
const config = require('./config')

const connection_deploy = {
  host : process.env.PGHOST,
  port : process.env.PGPORT,
  user : process.env.PGUSER,
  password : process.env.PGPASSWORD,
  database : process.env.PGDATABASE,
  ssl: { rejectUnauthorized:false },
}

const connection_dev = {
  host : process.env.DEV_PGHOST,
  port : process.env.DEV_PGPORT,
  user : process.env.DEV_PGUSER,
  password : process.env.DEV_PGPASSWORD,
  database : process.env.DEV_PGDATABASE,
}

const knex = require('knex')({
    client: 'pg',
    connection: (config.DEV) ? connection_dev :connection_deploy,
    pool: { min: 0, max: 10 }
  });

console.log((config.DEV) ? connection_dev : connection_deploy)
console.log(config.DEV)
module.exports =  knex;
 