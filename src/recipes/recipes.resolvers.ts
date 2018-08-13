import {Mutation, Query, Resolver, DelegateProperty, Subscription} from "@nestjs/graphql";
import {RecipesService} from "./recipes.service";
import {IRecipe} from "./interfaces/IRecipe";
import { PubSub, withFilter } from 'graphql-subscriptions';
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
  async getRecipe(obj, args, context, info): Promise<IRecipe> {
    const {_id} = args;
    return await this.recipesService.get(_id);
  }

  @Mutation('createRecipe')
  async createRecipe(obj, args, context, info): Promise<IRecipe> {
    const {createDto} = args;
    const recipeCreated = await this.recipesService.create(createDto);
    pubSub.publish(RECIPE_MUTATION_STATES.CREATED, {
      recipe: recipeCreated,
      mutationStatus: MUTATION_STATUS.CREATED,
    });
    return recipeCreated;
  }

  @Mutation('updateRecipe')
  async updateRecipe(obj, args, context, info): Promise<IRecipe> {
    const {_id, updateDto} = args;
    const recipeUpdated = await this.recipesService.update(_id, updateDto);
    pubSub.publish(RECIPE_MUTATION_STATES.UPDATED, {
      recipe: recipeUpdated,
      mutationStatus: MUTATION_STATUS.UPDATED,
    });
    return recipeUpdated;
  }

  @Mutation('deleteRecipe')
  async deleteRecipe(obj, args, context, info): Promise<IRecipe> {
    const {_id} = args;
    const recipeDeleted = await this.recipesService.delete(_id);
    pubSub.publish(RECIPE_MUTATION_STATES.DELETED, {
      recipe: recipeDeleted,
      mutationStatus: MUTATION_STATUS.DELETED,
    });
    return recipeDeleted;
  }

  @Mutation('upVoteRecipe')
  async upVoteRecipe(obj, args, context, info): Promise<IRecipe> {
    const {_id} = args;
    const recipeUpVoted = await this.recipesService.upVote(_id);
    pubSub.publish(RECIPE_MUTATION_STATES.UPDATED, {
      recipe: recipeUpVoted,
      mutationStatus: MUTATION_STATUS.UPDATED,
    });
    return recipeUpVoted;
  }

  @Mutation('downVoteRecipe')
  async downVoteRecipe(obj, args, context, info): Promise<IRecipe> {
    const {_id} = args;
    const recipeDownVoted = await this.recipesService.downVote(_id);
    pubSub.publish(RECIPE_MUTATION_STATES.UPDATED, {
      recipe: recipeDownVoted,
      mutationStatus: MUTATION_STATUS.UPDATED,
    });
    return recipeDownVoted;
  }

  @Subscription('subAllRecipes')
  subAllRecipes() {
    return {
      subscribe: withFilter(
        () => pubSub.asyncIterator([
          RECIPE_MUTATION_STATES.CREATED,
          RECIPE_MUTATION_STATES.UPDATED,
          RECIPE_MUTATION_STATES.DELETED
        ]),
        (payload, variables) => {
          return true
        }
      ),
      resolve: (payload, args, context) => {
        return payload;
      }
    };
  }
}
