exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table) {
      table.increments('id').primary();
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id').onDelete('CASCADE');
      table.text('content').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
  };
  