import { Component, OnInit, Output, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  selectedIngredient :Ingredient;

  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onAddIngredient(event){
    this.ingredients.push(event);
  }

  onDelete(flag : boolean){
    if ((flag) && (this.ingredients.length > 0)){
      this.ingredients.pop();
    }
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
