import { Ingredient } from '../../../models/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeModel } from '../../../models/recipe-model'; 
import { IngredientService } from '../../../services/ingredients.service';
import { RecipeService } from '../../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  standalone: true,
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgbModule,]
})
export class RecipesFormComponent implements OnInit {
  recipesForm!: FormGroup;
  recetas: RecipeModel[] = [];
  selectedIngredients: Ingredient[] = [];
  selectedIngredient: Ingredient | null = null; // Cambiar tipo de selectedIngredient a Ingredient
  ingredientQuantity: string = '';
  allIngredients: Ingredient[] = []; // Definir la propiedad
  ingredientEditIndex: number | null = null; // Agregar índice de edición
  recetaEditIndex: number | null = null; // Agregar índice de edición de receta

  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) {
    this.recipesForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      preparation: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.ingredientService.selectedIngredients$.subscribe((ingredients) => {
      this.allIngredients = ingredients;
    });

    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recetas = recipes;
      console.log('Recetas cargadas:', this.recetas);
    });
  }

  openIngredientModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  addIngredient(modal: any) {
    if (this.selectedIngredient && this.ingredientQuantity) {
      const ingredient = this.selectedIngredient;
      if (this.ingredientEditIndex !== null) {
        this.selectedIngredients[this.ingredientEditIndex] = {
          id: ingredient.id,
          name: ingredient.name,
          quantity: this.ingredientQuantity,
          merma: ingredient.merma,
          precio: ingredient.precio
        };
        this.ingredientEditIndex = null;
      } else {
        this.selectedIngredients.push({
          id: ingredient.id,
          name: ingredient.name,
          quantity: this.ingredientQuantity,
          merma: ingredient.merma,
          precio: ingredient.precio
        });
      }
      this.selectedIngredient = null;
      this.ingredientQuantity = '';
      console.log('Ingrediente agregado/modificado:', this.selectedIngredients);
    }
    modal.close();
  }

  onIngredientChange() {
    const ingredient = this.allIngredients.find(ing => ing.name === this.selectedIngredient?.name);
    if (ingredient) {
      this.selectedIngredient = ingredient;
    }
  }

  editIngredient(index: number, content: any) {
    const ingredient = this.selectedIngredients[index];
    this.selectedIngredient = ingredient;
    this.ingredientQuantity = ingredient.quantity;
    this.ingredientEditIndex = index;
    this.modalService.open(content, { centered: true });
    console.log('Editar ingrediente:', ingredient);
  }

  removeIngredient(index: number) {
    this.selectedIngredients.splice(index, 1);
    console.log('Ingrediente eliminado:', this.selectedIngredients);
  }

  onSubmit(modal: any) {
    if (this.recipesForm.valid) {
      const recipe: RecipeModel = {
        id: this.recetaEditIndex !== null ? this.recetas[this.recetaEditIndex].id : undefined,
        ...this.recipesForm.value,
        ingredients: this.selectedIngredients
      };

      if (this.recetaEditIndex !== null) {
        // Actualizar receta existente
        this.recipeService.updateRecipe(recipe).subscribe((updatedRecipe) => {
          this.recetas[this.recetaEditIndex!] = updatedRecipe;
          console.log('Receta actualizada:', updatedRecipe);
          this.recetaEditIndex = null;
        });
      } else {
        // Crear nueva receta
        this.recipeService.createRecipe(recipe).subscribe((newRecipe) => {
          console.log('Receta creada:', newRecipe);
          this.recetas.push(newRecipe);
        });
      }

      this.recipesForm.reset();
      this.selectedIngredients = [];
      modal.close();
      console.log('Lista de recetas actualizada:', this.recetas);
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  editReceta(index: number, content: any) {
    const receta = this.recetas[index];
    this.recipesForm.patchValue({
      name: receta.name,
      description: receta.description,
      preparation: receta.preparation
    });
    this.selectedIngredients = receta.ingredients;
    this.recetaEditIndex = index; // Establecer el índice de la receta que se está editando
    this.modalService.open(content, { centered: true });
    console.log('Receta editada:', receta);
  }

  deleteReceta(receta: RecipeModel) {
    this.recipeService.deleteRecipe(receta.id!).subscribe(() => {
      this.recetas = this.recetas.filter(r => r !== receta);
      console.log('Receta eliminada:', receta);
    });
  }
}