import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

/*   @Output() newIngredient = new EventEmitter<Ingredient>(); */
  @ViewChild('nameInput') ingredientName : ElementRef;
  @ViewChild('amountInput') ingredientAmount : ElementRef;
/*   @Output() deleteFlag = new EventEmitter<boolean>(); */
  @ViewChild('f') addForm : NgForm;
  ingSubscription: Subscription;
  editMode = false;
  index : number = -1;
  
  

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingSubscription = this.shoppingListService.ingredientSelected.subscribe(
      (index : number) => {
        this.editMode = true;
        this.index = index;
        this.addForm.setValue({
          "name": this.shoppingListService.getIngredient(index).name,
          "amount": this.shoppingListService.getIngredient(index).amount
        })
      }
    )
  }

/*   onAddIngredient(){
   
    let ingredient = new Ingredient('',0);
    if ((this.ingredientName.nativeElement.value != '') && (this.ingredientAmount.nativeElement.value != '')) {
      ingredient.name = this.ingredientName.nativeElement.value;
      ingredient.amount = this.ingredientAmount.nativeElement.value;
      console.log(ingredient.amount);
      this.newIngredient.emit(ingredient);
    }

  } */

  onAddIngredient(){
    if (!this.editMode) {
      const ingredient = new Ingredient (this.ingredientName.nativeElement.value,this.ingredientAmount.nativeElement.value);
      this.shoppingListService.addIngredient(ingredient);
    } else {
      const ingredient = new Ingredient (this.addForm.value.name, this.addForm.value.amount);
      this.shoppingListService.editIngredient(this.index, ingredient);
    }

    
  }

  onDelete(){
  /*   this.deleteFlag.emit(true);  */
    this.onClear();
    if (this.index !== -1) {
      this.shoppingListService.deleteIngredient(this.index);
      this.index = -1;
   }

  }

  onClear(){
    this.addForm.reset();
    this.editMode = false;
  }

  onSubmit(){
    const ingredient = new Ingredient(this.addForm.value.name, this.addForm.value.amount);
    if (!this.editMode) {
    this.shoppingListService.addIngredient(ingredient);
    }else {
    this.shoppingListService.editIngredient(this.index, ingredient);
   }
   this.addForm.reset();
   this.editMode = false;
  
  }


  ngOnDestroy(){
    this.ingSubscription.unsubscribe();
  }

}
