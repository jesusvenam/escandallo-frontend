import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RecipesFormComponent } from './components/recipe/recipes-form/recipes-form.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { NgModule } from '@angular/core';
import { IngredientsFormComponent } from './components/ingredients/ingredients-form/ingredients-form.component';
import { HomeComponent } from './components/home/home.component';
import { EscandalloComponent } from './components/escandallo/escandallo.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipeComponent },
    { path: 'recipesform', component: RecipesFormComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'ingredientsform', component: IngredientsFormComponent },
    { path: 'escandallo', component: EscandalloComponent },
    { path: '**', redirectTo: '' }






];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule,],
  })
  export class AppRoutingModule {}
