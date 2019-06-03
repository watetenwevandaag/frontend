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

  


}
