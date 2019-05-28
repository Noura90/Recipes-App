import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { NoRecipeComponent } from './recipes/no-recipe/no-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    {path: '' , redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children : [
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent},
        {path: '', component: NoRecipeComponent, pathMatch: 'full'}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
    
]


@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule {

}