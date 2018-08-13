
export interface IRecipe {
  _id: string;
  creator: string;
  title: string;
  recipeDescription: string;
  ingredients: Array<IRecipeIngredient>;
  upVotes: number;
  downVotes: number;
  createdAt?: string;
  updatedAt?: string;
}

export type IRecipeIngredientMeasurementType = 'gms' | 'mls' | 'ls' | 'lbs' | 'cups';

export interface IRecipeIngredient {
  name: string;
  amount?: string;
  measurement?: IRecipeIngredientMeasurementType;
}
