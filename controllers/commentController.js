const Comment = require('../models/Comment');

const commentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.query().withGraphFetched('post');
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching comments.' });
    }
  },

  getCommentById: async (req, res) => {
    const commentId = req.params.id;
    try {
      const comment = await Comment.query().findById(commentId).withGraphFetched('post');
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching comment.' });
    }
  },

  createComment: async (req, res) => {
    const { postId, content } = req.body;
    try {
      const comment = await Comment.query().insert({ postId, content });
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating comment.' });
    }
  },

  updateComment: async (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;
    try {
      const updatedComment = await Comment.query().patchAndFetchById(commentId, { content });
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      res.json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating comment.' });
    }
  },

  deleteComment: async (req, res) => {
    const commentId = req.params.id;
    try {
      const deletedComment = await Comment.query().deleteById(commentId);
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      res.json({ message: 'Comment deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting comment.' });
    }
  }
};

module.exports = commentController;
