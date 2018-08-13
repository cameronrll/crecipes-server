import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {RecipeSchema} from "./schema/recipe.schema";
import {RecipesService} from "./recipes.service";
import {RecipesResolvers} from "./recipes.resolvers";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'recipes',
        schema: RecipeSchema
      }
    ]),
  ],
  providers: [
    RecipesService,
    RecipesResolvers
  ]
})
export class RecipesModule {}
