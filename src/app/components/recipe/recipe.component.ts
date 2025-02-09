import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { CommonModule, NgFor } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  imports: [CommonModule, NgFor]
})
export class RecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;

  constructor(private recipeService: RecipeService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.cargarRecetas();
  }

  cargarRecetas(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      console.log('Recetas cargadas:', data);
      this.recipes = data;
    });
  }

  eliminarReceta(id: number | undefined): void {
    if (id !== undefined) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
      });
    }
  }

 viewRecipe(recipe: Recipe, modal: any): void {
    this.selectedRecipe = recipe;
    this.modalService.open(modal, { centered: true });
  }
}