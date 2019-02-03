
exports.up = function(knex, Promise) {
    const chain = [];

    chain.push("messages", table => {
        table.increments("_id");
        table.string("send_to");
        table.string("sent_from");
        table.text("content");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    return Promise.all(chain);
};

exports.down = function(knex, Promise) {
    return Promise.all([knex.schema.dropTable("messages")]);
};
