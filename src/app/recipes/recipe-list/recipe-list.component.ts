import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  @Output() selectedRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[];
  recipeSubscription : Subscription;

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  onRecipeItemSelected(event: Recipe){
    this.selectedRecipe.emit(event);
  }
  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }

}
