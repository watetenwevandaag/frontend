import { Ingredient } from './ingredient.model';
import { Time } from '@angular/common';
import { Cook } from './cook';

export class Recipe {
    id?: number;
    name: string;
    ingredients: Ingredient[];
    equipmentUsed: string[];
    image: string;
    description: string;
    isVegan: boolean;
    likes: number;
    dislikes: number;
    forNumberOfPeople: number;
    cookingTime: Time;
    owner: Cook;

    

}
