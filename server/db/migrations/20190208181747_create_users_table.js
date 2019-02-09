exports.up = function(knex, Promise) {
    const chain = [];

    chain.push(
        knex.schema.createTableIfNotExists("users", table => {
            table.increments("_id");
            table.string("user_id");
            table.string("username");
            table.string("email");
            // table.string("email").unique();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
    )
    return Promise.all(chain);
};

exports.down = function(knex, Promise) {
    return Promise.all([knex.schema.dropTable("users")]);
};
