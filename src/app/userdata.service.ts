import { Injectable } from '@angular/core';
import { Cook } from './models/cook';
import { Recipe } from './models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor() { }

  private view = 'Start';

  private loggedInCook: Cook = {
    username: null,
    email:null,
    ownRecipes: null
  };

  private searchWord = '';

  private recipes: Recipe[];

  public setRecipes(data: Recipe[]){
    this.recipes = data;
  }

  public getRecipes(){
    return this.recipes;
  }

  public setSearchWord(data: string){
    this.searchWord = data;
  }

  public getSearchWord(){
    return this.searchWord;
  }

  public getCook(){
    return this.loggedInCook;
  }

  public setCook(user: Cook){
    this.loggedInCook = user;
  }

  public getViewData(){
    return this.view;
  }

  public setViewData(data: string){
    this.view = data;
    console.log(this.view)
  }
}
