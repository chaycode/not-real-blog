
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
		table.increments('id').primary();
		table.string('first_name');
		table.string('last_name');
		table.string('username').index().unique();
		table.string('password_hash');
		table.string('email');
		table.text('bio');
		table.dateTime('created_at');
		table.dateTime('updated_at');
		table.dateTime('last_login');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');
};
