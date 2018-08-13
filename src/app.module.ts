import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {SubscriptionsModule} from "./subscriptions/subscriptions.module";
import {GraphQLFactory, GraphQLModule} from "@nestjs/graphql";
import {SubscriptionsService} from "./subscriptions/subscriptions.service";
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import {RecipesModule} from "./recipes/recipes.module";

@Module({
  imports: [
    SubscriptionsModule.forRoot(),
    RecipesModule,
    GraphQLModule,
    MongooseModule.forRoot('mongodb://localhost:27017/crecipes'),
  ],
})
export class AppModule implements NestModule{
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const schema = this.createSchema();
    this.subscriptionsService.createSubscriptionServer(schema);

    consumer
      .apply(
        graphiqlExpress({
          endpointURL: '/graphql',
          subscriptionsEndpoint: `ws://localhost:3001/subscriptions`,
        }),
      )
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    return this.graphQLFactory.createSchema({ typeDefs });
  }
}
