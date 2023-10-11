const { Model } = require('objection');

class Comment extends Model {
  static get tableName() {
    return 'comments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['postId', 'content'],

      properties: {
        id: { type: 'integer' },
        postId: { type: 'integer' },
        content: { type: 'string', minLength: 1 }
      }
    };
  }

  static get relationMappings() {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'comments.postId',
          to: 'posts.id'
        }
      }
    };
  }
}

module.exports = Comment;
