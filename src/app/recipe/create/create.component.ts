import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
export class CreateComponent implements OnInit, OnChanges {
  
  @Input() view: string;

  recipeToUpdate: Recipe;

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

   ngOnChanges(changes: SimpleChanges){
    if(changes.view.currentValue == 'EditRecipe'){
      var recipes = [];
      if(this.userDataService.getRecipes().length = 1){
          recipes = this.userDataService.getRecipes();
          this.recipeToUpdate = recipes[0];
      }else{
        this.recipeToUpdate == null;
      }   
    }
  }


  ngOnInit() {
    if(this.recipeToUpdate == null){
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
    }else{
      var ingredientsToUse = this.fb.array([])
      this.recipeToUpdate.ingredients.forEach(ingredient => {
        var ingredientToUse = this.fb.group({ 
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit:ingredient.unit
        })
        ingredientsToUse.push(ingredientToUse);
      });

      var equipmentsToUse = this.fb.array([])
      this.recipeToUpdate.equipmentUsed.forEach(a => {
        var equipmentToUse = this.fb.group({ 
          name: a
        })
        equipmentsToUse.push(equipmentToUse);
      });

      this.createForm = this.fb.group({
        name: this.recipeToUpdate.name,
        description: this.recipeToUpdate.description,
        forNumberOfPeople: this.recipeToUpdate.forNumberOfPeople,
        isVegan: this.recipeToUpdate.isVegan,
        cookingTime: this.recipeToUpdate.cookingTime,
        ingredients: ingredientsToUse,
        equipmentUsed: equipmentsToUse,
      }) 
    }
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
    var createdRecipes = [];
    if(this.recipeToUpdate == null){
      this.createdRecipe = this.createForm.value;
      var stringArray = this.createdRecipe.equipmentUsed.map(function(item) {
        return item['name'];
      });;
      this.createdRecipe.equipmentUsed = stringArray;
      this.createdRecipe.owner = this.userDataService.getCook();
      console.log(this.createdRecipe);
      this.recipeService.createRecipe(this.createdRecipe);
      createdRecipes.push(this.createdRecipe);
    }else{
      var id = this.recipeToUpdate.id;
      this.recipeToUpdate = this.createForm.value;
      var stringArray = this.recipeToUpdate.equipmentUsed.map(function(item) {
        return item['name'];
      });;
      this.recipeToUpdate.equipmentUsed = stringArray;
      this.recipeToUpdate.id = id;
      console.log(this.recipeToUpdate);
      this.recipeService.updateRecipe(this.recipeToUpdate);
      createdRecipes.push(this.recipeToUpdate);
    }
    stringArray = [];
    this.userDataService.setRecipes(createdRecipes);
    this.userDataService.setViewData('OwnRecipes')
  }
}
