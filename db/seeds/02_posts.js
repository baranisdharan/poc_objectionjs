exports.seed = async function(knex) {
    // Deletes ALL existing entries in the posts table
    await knex('posts').del();
  
    // Inserts seed entries for posts
    await knex('posts').insert([
      { userId: 1, content: 'Post 1 by user1' },
      { userId: 2, content: 'Post 1 by user2' },
      // Add more posts as needed
    ]);
  };
  