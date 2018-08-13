import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {RecipeSchema} from "./schema/recipe.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'recipe',
        schema: RecipeSchema
      }
    ]),
  ]
})
export class RecipesModule {}
