import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {CommentsService} from "./comments.service";
import {CommentsResolvers} from "./comments.resolvers";
import {CommentSchema} from "./schema/comment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'comments',
        schema: CommentSchema
      }
    ]),
  ],
  providers: [
    CommentsService,
    CommentsResolvers
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
