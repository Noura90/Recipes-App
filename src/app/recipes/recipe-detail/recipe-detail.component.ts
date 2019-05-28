import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 recipe : Recipe;
  constructor(private recipeService : RecipeService, 
    private shoppingListService : ShoppingListService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    )
  }

  addToShoppingList(ingredients: Ingredient[]){
    
   for(let ingredient of ingredients) {
      this.shoppingListService.addIngredient(ingredient);
    }

    
    console.log( this.shoppingListService.getIngredients());
    
  }

}
