
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        { send_to: 'Biff', sent_from: 'admin', content: 'This is an awesome test message content body filler. This chili is spicy.'},
        { send_to: 'Marty', sent_from: 'Biff', content: 'This is an awesome test message content body filler. This chili is spicy.'},
        { send_to: 'us-west-2:938ff5c2-550d-48c7-90ef-ffaf9c11d762', sent_from: 'Biff', content: 'This is an awesome test message content body filler. This chili is spicy.'},
        { send_to: 'Biff', sent_from: 'us-west-2:938ff5c2-550d-48c7-90ef-ffaf9c11d762', content: 'This is an awesome test message content body filler. This chili is spicy.'}
      ]);
    });
};
