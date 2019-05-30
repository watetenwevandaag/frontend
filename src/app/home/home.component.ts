import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private data: RecipeService) { }

  recipes: Object;

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(){
    this.data.getRecipes().then((recipeList: Recipe[]) => {
      console.log(recipeList);
      this.recipes = recipeList;
    })
  }

}
