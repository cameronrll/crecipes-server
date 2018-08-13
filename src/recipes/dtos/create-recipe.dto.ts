import {IRecipeIngredientMeasurementType} from "../interfaces/IRecipe";

export class CreateRecipeDto {
  readonly creator: string;
  readonly title: string;
  readonly recipeDescription: string;
  readonly ingredients: Array<CreateRecipeIngredient>;
}

export class CreateRecipeIngredient {
  readonly name: string;
  readonly amount?: string;
  readonly measurement?: IRecipeIngredientMeasurementType
}
