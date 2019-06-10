import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute, 
    private recipeService : RecipeService,
    private router : Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = this.id != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '',
    recipeImagePath = '',
    recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push (new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^\d*[1-9]\d*$/)
            ])
          })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      "ingredients" : recipeIngredients
    })
  }

  onSubmit(){
  /*   let ingredients : Ingredient[] = [];
    let ingredientsControls = (<FormArray>this.recipeForm.get('ingredients')).controls;
    for (let ingredientControl of ingredientsControls){
      ingredients.push(new Ingredient(ingredientControl.value.name, ingredientControl.value.amount))
    } */
    const recipe = new Recipe(
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imagePath').value,
      this.recipeForm.value['ingredients']
      /* ingredients */);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addNewRecipe(recipe);
    }
    this.onCancel();
  }

  onAddIngredient(){
    const controlGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d*[1-9]\d*$/)
      ])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(controlGroup);
  }

  onDeleteIng(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo : this.route});
  }


}
