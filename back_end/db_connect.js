require("dotenv").config();

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.PGHOST,
      port : process.env.PGPORT,
      user : process.env.PGUSER,
      password : process.env.PGPASSWORD,
      database : process.env.PGDATABASE
    },
    pool: { min: 0, max: 10 }
  });

  module.exports =  knex;
 