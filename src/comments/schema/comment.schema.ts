import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
