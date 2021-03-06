import { Recipe } from './recipe.model';
/* import { EventEmitter } from '@angular/core'; */
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Hamburger', 
        'American Dish', 
        'https://www.thespruceeats.com/thmb/HEbGAFMq0PxbLMd3_Ooedlv_sCY=/3000x2000/filters:fill(auto,1)/Hamburger-Hot-Dog-58add5f03df78c345bdef6ff.jpg',
        [   new Ingredient("meat", 1),
            new Ingredient("fries", 20)]),
        new Recipe('Pizza', 
        'Italian Dish', 
        'https://www.galbani.fr/wp-content/uploads/2017/07/pizza_parma.png',
        [   new Ingredient("tomato", 5),
            new Ingredient("cheese", 5)])
         ];

       /* recipeSelected = new EventEmitter<Recipe>(); */


      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(id : number){
        const recipe = this.recipes[id];
        return recipe;
      }

      addNewRecipe(recipe : Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.getRecipes());
      }

      updateRecipe(index: number, recipe: Recipe){
          this.recipes[index] = recipe;
          this.recipesChanged.next(this.getRecipes());
      }

      deleteRecipe(index : number){
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.getRecipes());
      }


      

}