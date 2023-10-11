const Post = require('../models/Post');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.query().withGraphFetched('user');
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching posts.' });
    }
  },

  getPostById: async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await Post.query().findById(postId).withGraphFetched('user');
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching post.' });
    }
  },

  createPost: async (req, res) => {
    const { userId, content } = req.body;
    try {
      const post = await Post.query().insert({ userId, content });
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post.' });
    }
  },

  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;
    try {
      const updatedPost = await Post.query().patchAndFetchById(postId, { content });
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating post.' });
    }
  },

  deletePost: async (req, res) => {
    const postId = req.params.id;
    try {
      const deletedPost = await Post.query().deleteById(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting post.' });
    }
  }
};

module.exports = postController;
