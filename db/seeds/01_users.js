const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries in the users table
  await knex('users').del();

  // Inserts seed entries for users
  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    { username: 'user1', password: hashedPassword },
    { username: 'user2', password: hashedPassword },
    // Add more users as needed
  ]);
};
