import { Component, OnInit } from '@angular/core';
import { UserdataService } from './userdata.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from './recipe.service';
import { Recipe } from './models/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  
  title = 'wewv';

  private view = 'Start';

  constructor(private recipeService: RecipeService, public userData: UserdataService){}

  recipes: Recipe[];

  ngOnInit(){
    this.userData.setViewData('Start')
    this.getAllRecipes();
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  onSubmit(){
      console.log(this.searchForm.value.name)
      this.getSearchRecipes(this.searchForm.value.name);
      this.userData.setViewData('Search')
      this.searchForm.reset();
  }

  getAllRecipes(){
    this.recipeService.getRecipes().then((recipeList: Recipe[]) => {
      this.recipes = recipeList;
    })
  }

  getSearchRecipes(word: string){
    this.recipeService.searchRecipe(word).then((recipeList: Recipe[]) => {
      this.recipes = recipeList;
    })
  }

  generateWeekMenu(){
    this.recipeService.getWeekMenu().then((recipeList: Recipe[]) => {
      this.recipes = recipeList;
    })
    this.userData.setViewData('GenerateWeekMenu');
  }

  getOwnRecipes(){
    this.recipeService.getOwnRecipes(this.userData.getCook()).then((recipeList: Recipe[]) => {
      this.recipes = recipeList;
    })
    this.userData.setViewData('OwnRecipes');
  }




}
