import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { UserdataService } from 'src/app/userdata.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private userData: UserdataService) { }
  
  recipes: Object;

  ngOnInit() {
  
  }

  
  @Input() 
  test = this.userData.getRecipes;

  ngOnChanges(changes: SimpleChanges) {
      this.recipes = changes.test.firstChange;
  }

}
