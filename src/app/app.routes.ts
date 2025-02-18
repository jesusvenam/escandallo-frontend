import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RecipesFormComponent } from './components/recipe/recipes-form/recipes-form.component';
import { RouterModule, Routes } from '@angular/router'; 
import { EscandalloComponent } from './escanadallo/escanadallo.component';





import { NgModule } from '@angular/core';
import { IngredientsFormComponent } from './components/ingredients/ingredients-form/ingredients-form.component';
import { HomeComponent } from './components/home/home.component';





export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recipesform', component: RecipesFormComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'escandallo', component: EscandalloComponent },
    
    
   
    { path: '**', redirectTo: '' }






];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule,],
  })
  export class AppRoutingModule {}
