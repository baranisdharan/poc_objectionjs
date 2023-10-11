const { Model } = require('objection');
const Comment = require('./Comment');

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'content'],

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        content: { type: 'string', minLength: 1 }
      }
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.userId',
          to: 'users.id'
        }
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'posts.id',
          to: 'comments.postId'
        }
      }
    };
  }
}

module.exports = Post;
