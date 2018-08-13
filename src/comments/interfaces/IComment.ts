
export interface IComment {
  _id: string;
  recipeId: string;
  username: string;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}
