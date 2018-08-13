import {Mutation, Query, Resolver, Subscription} from "@nestjs/graphql";
import {RecipesService} from "./recipes.service";
import {IRecipe} from "./interfaces/IRecipe";
import {CreateRecipeDto} from "./dtos/create-recipe.dto";
import {UpdateRecipeDto} from "./dtos/update-recipe.dto";
import { PubSub } from 'graphql-subscriptions';
import {RECIPE_MUTATION_STATES} from "./recipe.constants";
import {MUTATION_STATUS} from "../subscriptions/subscription.constants";

const pubSub = new PubSub();

@Resolver('Recipe')
export class RecipesResolvers {
  constructor(private readonly recipesService: RecipesService) {}

  @Query('getAllRecipes')
  async getAllRecipes(): Promise<Array<IRecipe>> {
    return await this.recipesService.getAll();
  }

  @Query('getRecipe')
  async getRecipe(id: string): Promise<IRecipe> {
    return await this.recipesService.get(id);
  }

  @Mutation('createRecipe')
  async createRecipe(createDto: CreateRecipeDto): Promise<IRecipe> {
    const recipeCreated = await this.recipesService.create(createDto);
    pubSub.publish(RECIPE_MUTATION_STATES.CREATED, {
      recipe: recipeCreated,
      mutationStatus: MUTATION_STATUS.CREATED,
    });
    return recipeCreated;
  }

  @Mutation('updateRecipe')
  async updateRecipe(id: string, updateDto: UpdateRecipeDto): Promise<IRecipe> {
    const recipeUpdated = await this.recipesService.update(id, updateDto);
    pubSub.publish(RECIPE_MUTATION_STATES.UPDATED, {
      recipe: recipeUpdated,
      mutationStatus: MUTATION_STATUS.UPDATED,
    });
    return recipeUpdated;
  }

  @Mutation('deleteRecipe')
  async deleteRecipe(id: string): Promise<IRecipe> {
    const recipeDeleted = await this.recipesService.delete(id);
    pubSub.publish(RECIPE_MUTATION_STATES.DELETED, {
      recipe: recipeDeleted,
      mutationStatus: MUTATION_STATUS.DELETED,
    });
    return recipeDeleted;
  }

  @Mutation('upVoteRecipe')
  async upVoteRecipe(id: string): Promise<IRecipe> {
    const recipeUpVoted = await this.recipesService.upVote(id);
    pubSub.publish(RECIPE_MUTATION_STATES.UPDATED, {
      recipe: recipeUpVoted,
      mutationStatus: MUTATION_STATUS.UPDATED,
    });
    return recipeUpVoted;
  }

  @Mutation('downVoteRecipe')
  async downVoteRecipe(id: string): Promise<IRecipe> {
    const recipeDownVoted = await this.recipesService.downVote(id);
    pubSub.publish(RECIPE_MUTATION_STATES.UPDATED, {
      recipe: recipeDownVoted,
      mutationStatus: MUTATION_STATUS.UPDATED,
    });
    return recipeDownVoted;
  }

  @Subscription('subAllRecipes')
  subAllRecipes() {
    return {
      subscribe: () => pubSub.asyncIterator([
        RECIPE_MUTATION_STATES.CREATED,
        RECIPE_MUTATION_STATES.UPDATED,
        RECIPE_MUTATION_STATES.DELETED
      ])
    };
  }
}
