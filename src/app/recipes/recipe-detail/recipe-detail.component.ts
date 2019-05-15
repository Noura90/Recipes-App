import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe : Recipe;
  constructor(private recipeService : RecipeService, private shoppingListService : ShoppingListService) {}

  ngOnInit() {
  }

  addToShoppingList(ingredients: Ingredient[]){
    
   for(let ingredient of ingredients) {
      this.shoppingListService.addIngredient(ingredient);
    }

    
    console.log( this.shoppingListService.getIngredients());
    
  }

}
