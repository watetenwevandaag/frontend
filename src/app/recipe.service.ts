import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  public getRecipes(): Promise<Recipe[]>{
    return this.http.get('http://localhost:8090/recipe/all')
    .toPromise()
    .then(response => response as Recipe[])
    .catch(this.handleError);
  }

  public createRecipe(recipe: Recipe): Promise<Recipe>{
    return this.http.post('http://localhost:8090/recipe/create', recipe)
    .toPromise()
    .then(response => response as Recipe)
    .catch(this.handleError);
  }

  public searchRecipe(name: string): Promise<Recipe[]>{
    return this.http.get('http://localhost:8090/recipe/byName/'+ name)
    .toPromise()
    .then(response => response as Recipe)
    .catch(this.handleError);
  }

  public getWeekMenu(): Promise<Recipe[]>{
    return this.http.get('http://localhost:8090/recipe/weekmenu')
    .toPromise()
    .then(response => response as Recipe)
    .catch(this.handleError);
  }

  private handleError (error: any): Promise<any> {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console
    return Promise.reject(errMsg);
  }
}
