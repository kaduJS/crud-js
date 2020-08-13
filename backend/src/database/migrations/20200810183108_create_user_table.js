exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.boolean("admin").notNull().defaultTo(false);
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
