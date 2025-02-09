import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IngredientService } from '../../services/ingredients.service'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgbModule, FormsModule]
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[] = [];
  editedIngredient: Ingredient = { name: '', quantity: '', merma: 0, precio: 0 };

  constructor(private ingredientService: IngredientService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.cargarIngredientes();
  }

  cargarIngredientes(): void {
    this.ingredientService.selectedIngredients$.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }

  deleteIngredient(index: number): void {
    const updatedIngredients = [...this.ingredients];
    updatedIngredients.splice(index, 1);
    this.ingredientService.updateIngredients(updatedIngredients);
  }

  editIngredient(ingredient: Ingredient, modal: any): void {
    this.editedIngredient = { ...ingredient };
    this.modalService.open(modal, { centered: true });
  }

  saveEditedIngredient(modal: any): void {
    const index = this.ingredients.findIndex(ing => ing.name === this.editedIngredient.name);
    if (index !== -1) {
      const updatedIngredients = [...this.ingredients];
      updatedIngredients[index] = { ...this.editedIngredient };
      this.ingredientService.updateIngredients(updatedIngredients);
    }
    modal.close();
  }
}