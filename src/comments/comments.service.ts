import { Model } from 'mongoose';
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {IComment} from "./interfaces/IComment";
import {CreateCommentDto} from "./dtos/create-comment.dto";

@Injectable()
export class CommentsService {
  constructor(@InjectModel('comments') private readonly commentModel: Model<IComment>) {}

  async getComments(recipeId?: string): Promise<Array<IComment>> {
    return <any>{};
  }

  async create(createDto: CreateCommentDto): Promise<IComment> {
    return <any>{};
  }

  async delete(_id: string): Promise<IComment> {
    return <any>{};
  }
}
