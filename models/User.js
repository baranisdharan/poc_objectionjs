const { Model } = require('objection');
const bcrypt = require('bcrypt');
const Post = require('./Post');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 6, maxLength: 255 }
      }
    };
  }

  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.userId'
        }
      }
    };
  }
}

module.exports = User;
