exports.up = function(knex) {
    return knex.schema.createTable('curriculos', function (table) {
      table.increments();
      table.string('nome').notNullable();
      table.string('email').notNullable();
      table.text('experiencia').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('curriculos');
  };  