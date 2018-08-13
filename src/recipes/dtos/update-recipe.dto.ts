import {IRecipeIngredientMeasurementType} from "../interfaces/IRecipe";

export class UpdateRecipeDto {
  readonly title?: string;
  readonly recipeDescription?: string;
  readonly ingredients?: Array<UpdateRecipeIngredient>;
}

export class UpdateRecipeIngredient {
  readonly name?: string;
  readonly amount?: string;
  readonly measurement?: IRecipeIngredientMeasurementType
}
