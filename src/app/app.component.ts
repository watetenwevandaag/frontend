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

  ngOnInit(){
    this.userData.setViewData('Start')
    this.getAllRecipes();
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  onSubmit(){
      console.log(this.searchForm.value.name)
      this.userData.setViewData('Search')
      this.searchForm.reset();
      this.getSearchRecipes(this.searchForm.value.name);
  }

  getAllRecipes(){
    this.recipeService.getRecipes().then((recipeList: Recipe[]) => {
      this.userData.setRecipes(recipeList);
    })
  }

  getSearchRecipes(word: string){
    this.recipeService.searchRecipe(word).then((recipeList: Recipe[]) => {
      this.userData.setRecipes(recipeList);
    })
  }




}
