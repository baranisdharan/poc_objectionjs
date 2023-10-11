exports.seed = async function(knex) {
    // Deletes ALL existing entries in the comments table
    await knex('comments').del();
  
    // Inserts seed entries for comments
    await knex('comments').insert([
      { postId: 1, content: 'Comment 1 on post 1' },
      { postId: 1, content: 'Comment 2 on post 1' },
      { postId: 2, content: 'Comment 1 on post 2' },
      // Add more comments as needed
    ]);
  };
  