import { Model } from 'mongoose';
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {IComment} from "./interfaces/IComment";
import {CreateCommentDto} from "./dtos/create-comment.dto";

@Injectable()
export class CommentsService {
  constructor(@InjectModel('comments') private readonly commentModel: Model<IComment>) {}

  async getComments(recipeId?: string): Promise<Array<IComment>> {
    let query = {};
    if(!!recipeId) {
      query = {
        recipeId: recipeId
      };
    }
    return await this.commentModel.find(query);
  }

  async create(createDto: CreateCommentDto): Promise<IComment> {
    const createdComment = new this.commentModel(createDto);
    return await createdComment.save();
  }

  async delete(_id: string): Promise<IComment> {
    return await this.commentModel.findOneAndRemove({_id: _id});
  }
}
