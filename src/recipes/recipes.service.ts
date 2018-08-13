import { Model } from 'mongoose';
import {Inject, Injectable} from "@nestjs/common";
import {IRecipe} from "./interfaces/IRecipe";
import {CreateRecipeDto} from "./dtos/create-recipe.dto";
import {UpdateRecipeDto} from "./dtos/update-recipe.dto";

@Injectable()
export class RecipesService {
  constructor(@Inject('RecipeModelToken') private readonly recipeModel: Model<IRecipe>) {}

  async getAll(): Promise<Array<IRecipe>> {
    return <any>{};
  }

  async get(id: string): Promise<IRecipe> {
    return <any>{};
  }

  async create(createDto: CreateRecipeDto): Promise<IRecipe> {
    return <any>{};
  }

  async update(id: string, updateDto: UpdateRecipeDto): Promise<IRecipe> {
    return <any>{};
  }

  async delete(id: string): Promise<IRecipe> {
    return <any>{};
  }

  async upVote(id: string): Promise<IRecipe> {
   return <any>{};
  }

  async downVote(id: string): Promise<IRecipe> {
    return <any>{};
  }
}
