
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngredientService } from './services/ingredients.service';
import { RecipeModel } from './models/recipe-model';
import { EscandalloComponent } from './escanadallo/escanadallo.component'; 
import { RecipeService } from './services/recipe.service';
import { IngredientModel } from './models/recipe-model';

import { ModalService } from './services/modal.service';
import { AppComponent } from './app.component';



import { AppRoutingModule, routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  // <-- Aquí se importa el módulo
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipesFormComponent } from './components/recipe/recipes-form/recipes-form.component'; 
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IngredientsComponent } from './components/ingredients/ingredients.component';




 
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormArray, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { IngredientsFormComponent } from './components/ingredients/ingredients-form/ingredients-form.component'



@NgModule({
  declarations: [
    
  

    

  
   

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    ReactiveFormsModule,
    RecipesFormComponent,
    EscandalloComponent

   
  
    
    

  
  

    







  ],




  providers: [IngredientService],

})

export class IngredientsModule { }
