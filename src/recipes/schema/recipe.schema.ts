import * as mongoose from 'mongoose';

const ALLOWED_MEASUREMENT_VALUES = [
  'gms',
  'mls',
  'ls',
  'lbs',
  'cups',
];

const RecipeIngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: false
  },
  measurement: {
    type: String,
    required: false,
    enum: ALLOWED_MEASUREMENT_VALUES
  }
}, {
  _id: false
});

export const RecipeSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  recipeDescription: {
    type: String,
    required: true
  },
  ingredients: [RecipeIngredientSchema],
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});
