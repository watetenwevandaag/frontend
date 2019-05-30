import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { Time } from '@angular/common';
import { UserService } from 'src/app/user/user.service';
import { UserdataService } from 'src/app/userdata.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  createdRecipe: Recipe;

  recipeService: RecipeService;

  userDataService: UserdataService;

  ingredient = this.fb.group({ 
    name:'',
    quantity: 0,
    unit:''
  })

  equipment = this.fb.group({ 
    name:''
  })

  constructor( private fb: FormBuilder, recipeService: RecipeService, userDataService: UserdataService) {
    this.recipeService = recipeService;
    this.userDataService = userDataService;
   }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: [''],
      description: [''],
      forNumberOfPeople: [0],
      isVegan: [null],
      cookingTime: [null],
      ingredients: this.fb.array([
        this.fb.group({ 
          name:'',
          quantity: 0,
          unit:''
        }),
        this.fb.group({ 
          name:'',
          quantity: 0,
          unit:''
        })
      ]),
      equipmentUsed: this.fb.array([
        this.fb.group({ 
          name:''
        }),
        this.fb.group({ 
          name:''
        })
      ]),
    }) 
  }

  removeEquipment(i) {
    let equipmentArray = this.createForm.controls.equipmentUsed as FormArray;
    equipmentArray.removeAt(i);
  }
  
  addEquipment() { 
    const equipment = this.fb.group({ 
      name:''
    })
    let equipmentArray = this.createForm.controls.equipmentUsed as FormArray;
    equipmentArray.push(equipment);
  }

  removeIngredient(i) {
    let ingredientArray = this.createForm.controls.ingredients as FormArray;
    ingredientArray.removeAt(i);
  }
  
  addIngredient() { 
    const ingredient = this.fb.group({ 
      name:'',
      quantity: 0,
      unit:''
    })
    let ingredientArray = this.createForm.controls.ingredients as FormArray;
    ingredientArray.push(ingredient);
  }

  onSubmit(){
    this.createdRecipe = this.createForm.value;
    var stringArray = this.createdRecipe.equipmentUsed.map(function(item) {
      return item['name'];
    });;
    this.createdRecipe.equipmentUsed = stringArray;
    this.createdRecipe.owner = this.userDataService.getCook();
    console.log(this.createdRecipe);
    this.recipeService.createRecipe(this.createdRecipe);
    stringArray = [];
  }
}
