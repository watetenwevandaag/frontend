import { Recipe } from './recipe.model';

export class Cook {
    id?: number;
    username: string;
    email: string;
    ownRecipes: Recipe[]
}
