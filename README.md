# Example Project: Crecipes Server - Crowdsourced Recipes

## How to run

- Have mongodb installed and running locally
- npm and node installed
- ports 3000 and 3001 free

1. cd into the project and run `npm i`
2. run `npm run start` and the project will begin running on port 3000
3. navigate to `localhost:3000/graphiql` and try running some of the samples from below

## Samples

1. Create a recipe and view its subscription event (for this you will want two tabs for `locahost:3000/graphiql` open)
  
  Paste the following into the editor
  
```graphql
mutation{
  createRecipe(
    createDto: {
      creator: "cam",
      title: "Tomato Meatballs",
      recipeDescription: "Meatballs with a tomato sauce and rice",
      ingredients: [
        {
          name: "Meat Balls",
          amount: "5"
        },
        {
          name: "Tomato Sauce",
          amount: "10"
          measurement: cups
        },
        {
          name: "Rice",
          amount: 750,
          measurement: gms
        }
      ]
    }
  ) {
    _id
    creator
    title
    recipeDescription
    ingredients {
      name
      amount
      measurement
    }
    upVotes
    downVotes
    createdAt
    updatedAt
  }
}
```

Before you hit the play button, go to the other tab you have open and paste 
the following, and then hit the play button on the newly opened tab. 

```graphql
subscription{
  subAllRecipes{
    recipe{
    _id
    creator
    title
    recipeDescription
    ingredients {
      name
      amount
      measurement
    }
    upVotes
    downVotes
    createdAt
    updatedAt
    },
    mutationStatus
  }
}

```

Now go back to the first tab and hit the play button. Once you have got a response, make note of its `_id`, as we'll
use this later.

Go back to the other tab where you pasted the subscription, and there will also be a result there, showing you what was created.

Now we can create a comment for the recipe

```graphql
mutation{
  createComment(
    createDto: {
      recipeId: <recipeId>,
      username: "cam",
      comment: "Delicious, but needed more rice"
    }
  ) {
    _id
    recipeId
    username
    comment
    createdAt
    updatedAt
  }
}
```

Feel free that this point to create some more comments for this recipe, but first 
in your other tab, paste the following:

```graphql
subscription{
  subComments(recipeId: <recipeId>){
    comment{
      _id
      recipeId
      username
      comment
      createdAt
      updatedAt
    }
    mutationStatus
  }
}

```
Notice how, if you change the recipe Id for the comment you're creating, it will no longer
show up in the subscription. This is very useful in real world applications, where often you're only
interested in a small sub section of the total data coming back as real time depending on what the user
is currently viewing.

For further viewing of the API please take a look either in the project, or click around
in the `Docs` tab at the top right of the editor on `localhost:3000/graphiql`
