import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
/* import { EventEmitter } from '@angular/core'; */

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>();

     ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];


      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index : number){
        return this.ingredients[index];
      }


      addIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.getIngredients().slice());
      }

      editIngredient(index : number, ingredient : Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.getIngredients().slice());
      }

      deleteIngredient(index : number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.getIngredients().slice());
      }


    
}