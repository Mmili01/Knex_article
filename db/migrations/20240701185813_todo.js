/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  //Create a table called "todo" with the following columns: id, title, content, created_at, updated_at
  return knex.schema.createTable("todo", (table) => {
    table.increments("id").primary(); //id column with auto-incrementing primary key
    table.string("title").notNullable(); //title column with type string
    table.text("content").notNullable(); //content column with type text
    table.timestamps(true, true); //created_at and updated_at columns with type timestamp
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Drop the "todo" table if it exists
  return knex.schema.dropTableIfExists("todo");
};
