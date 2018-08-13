import { Model } from 'mongoose';
import {Injectable} from "@nestjs/common";
import {IRecipe} from "./interfaces/IRecipe";
import {CreateRecipeDto} from "./dtos/create-recipe.dto";
import {UpdateRecipeDto} from "./dtos/update-recipe.dto";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class RecipesService {
  constructor(@InjectModel('recipes') private readonly recipeModel: Model<IRecipe>) {}

  async getAll(): Promise<Array<IRecipe>> {
    return await this.recipeModel.find({});
  }

  async get(_id: string): Promise<IRecipe> {
    return await this.recipeModel.findById(_id);
  }

  async create(createDto: CreateRecipeDto): Promise<IRecipe> {
    const createdRecipe = new this.recipeModel(createDto);
    return await createdRecipe.save();
  }

  async update(_id: string, updateDto: UpdateRecipeDto): Promise<IRecipe> {
    return await this.recipeModel.findOneAndUpdate(
      {_id: _id},
      updateDto,
      {
        new: true,
        upsert: true
      }
    );
  }

  async delete(_id: string): Promise<IRecipe> {
    return await this.recipeModel.findOneAndRemove({_id: _id});
  }

  async upVote(_id: string): Promise<IRecipe> {
   return await this.recipeModel.findOneAndUpdate(
     {_id: _id},
     {
       $inc: {
         upVotes: 1
       }
     },
     {
       new: true
     }
   );
  }

  async downVote(_id: string): Promise<IRecipe> {
    return await this.recipeModel.findOneAndUpdate(
      {_id: _id},
      {
        $inc: {
          upVotes: -1
        }
      },
      {
        new: true
      }
    );
  }
}
