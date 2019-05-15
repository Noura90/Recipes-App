import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() newIngredient = new EventEmitter<Ingredient>();
  @ViewChild('nameInput') ingredientName : ElementRef;
  @ViewChild('amountInput') ingredientAmount : ElementRef;
  @Output() deleteFlag = new EventEmitter<boolean>();
  
  

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
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
    const ingredient = new Ingredient (this.ingredientName.nativeElement.value,this.ingredientAmount.nativeElement.value);
    this.shoppingListService.addIngredient(ingredient);
  }

  onDelete(){
    this.deleteFlag.emit(true); 
  }

  onClear(){
    this.ingredientName.nativeElement.value = '';
  }

}
