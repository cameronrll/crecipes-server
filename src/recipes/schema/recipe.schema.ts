import * as mongoose from 'mongoose';

const ALLOWED_MEASUREMENT_VALUES = [
  'gms',
  'mls',
  'ls',
  'lbs',
  'cups',
];

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
  ingredients: [
    {
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
    }
  ],
  upVotes: Number,
  downVotes: Number,
});

