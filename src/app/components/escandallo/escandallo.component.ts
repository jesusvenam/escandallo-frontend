import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IngredientService } from '../../services/ingredients.service';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.models';

@Component({
  standalone: true,
  selector: 'app-escandallo',
  templateUrl: './escandallo.component.html',
  styleUrls: ['./escandallo.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgbModule, FormsModule]
})
export class EscandalloComponent implements OnInit {
  ingredients: Ingredient[] = [];
  recipes: Recipe[] = [];
  selectedRecipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;

  constructor(
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cargarIngredientes();
    this.cargarRecetas();
  }

  cargarIngredientes(): void {
    this.ingredientService.selectedIngredients$.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }

  cargarRecetas(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  abrirSeleccionarRecetas(modal: any): void {
    this.modalService.open(modal, { centered: true });
  }

  seleccionarReceta(recipe: Recipe): void {
    if (!this.selectedRecipes.includes(recipe)) {
      this.selectedRecipes.push(recipe);
    }
  }


  calcularCosto(ingredient: Ingredient): number {
    const cantidadUsada = parseFloat(ingredient.quantity);
    const costeKilo = ingredient.precio;
    const merma = ingredient.merma / 100;
    const costeTotal = ((cantidadUsada * costeKilo) / 1000) / ( 1 - merma );
    return costeTotal;
  }

  calcularCostoTotalPlato(recipe: Recipe): number {
    return recipe.ingredients.reduce((total, ingredient) => total + this.calcularCosto(ingredient), 0);
  }
}