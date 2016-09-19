// Update with your config settings.
var pg = require('pg');


module.exports = {

  development: {
    client: 'pg',
    connection: {
			database: 'practice_database_thing'
		}
  },


  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
