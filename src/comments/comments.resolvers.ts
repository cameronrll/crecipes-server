import {Mutation, Query, Resolver, DelegateProperty, Subscription} from "@nestjs/graphql";
import {CommentsService} from "./comments.service";
import {IComment} from "./interfaces/IComment";
import {PubSub, withFilter} from "graphql-subscriptions";
import {MUTATION_STATUS} from "../subscriptions/subscription.constants";
import {COMMENT_MUTATION_STATES} from "./comments.constants";

const pubSub = new PubSub();

@Resolver('Comment')
export class CommentsResolvers {
  constructor(private readonly commentsService: CommentsService) {}

  @Query()
  async getComments(obj, args, context, info): Promise<Array<IComment>> {
    const {recipeId} = args;
    return await this.commentsService.getComments(recipeId);
  }

  @Mutation('createComment')
  async createComment(obj, args, context, info): Promise<IComment> {
    const {createDto} = args;
    const commentCreated = await this.commentsService.create(createDto);
    pubSub.publish(COMMENT_MUTATION_STATES.CREATED, {
      comment: commentCreated,
      mutationStatus: MUTATION_STATUS.CREATED
    });
    return commentCreated;
  }

  @Mutation('deleteComment')
  async deleteComment(obj, args, context, info): Promise<IComment> {
    const {_id} = args;
    const commentDeleted = await this.commentsService.delete(_id);
    pubSub.publish(COMMENT_MUTATION_STATES.DELETED, {
      comment: commentDeleted,
      mutationStatus: MUTATION_STATUS.DELETED
    });
    return commentDeleted;
  }

  @Subscription('subComments')
  subComments() {
    return {
      subscribe: withFilter(
        () => pubSub.asyncIterator([
          COMMENT_MUTATION_STATES.CREATED,
          COMMENT_MUTATION_STATES.UPDATED,
          COMMENT_MUTATION_STATES.DELETED
        ]),
        (payload: {comment: IComment}, variables: {recipeId?: string}) => {
          const {comment} = payload;
          if(!!variables.recipeId) {
            return comment.recipeId === variables.recipeId;
          }
          return true;
        }
      ),
      resolve: (payload, args, context) => {
        return payload;
      }
    }
  }
}
