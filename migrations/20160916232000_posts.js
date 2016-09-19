
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('posts', function(table) {
			table.increments('id').primary();
			table.integer('user_id');
			table.string('title');
			table.text('body');
			table.dateTime('created_at');
			table.dateTime('updated_at');
		})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('posts');
};
