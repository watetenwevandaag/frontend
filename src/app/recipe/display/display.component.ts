import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { UserdataService } from 'src/app/userdata.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnChanges {

  @Input() recipes: Recipe[];

  constructor(private userData: UserdataService) { }

  ngOnChanges(changes: SimpleChanges) {
      console.log(changes.recipes.currentValue);
  }

  editRecipe(recipeId: number){
    var recipeToUpdate: Recipe;
    this.recipes.forEach(recipe => {
     if(recipe.id = recipeId ){
        recipeToUpdate = recipe;
     }
    });
    var recipes = []
    recipes[0] = recipeToUpdate;
    this.userData.setRecipes(recipes);
    this.userData.setViewData('EditRecipe');
    
  }

  


}
