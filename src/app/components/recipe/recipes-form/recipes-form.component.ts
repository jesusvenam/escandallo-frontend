import { Component, NgModule } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { IngredientService } from '../../../services/ingredients.service'; 
import { Ingredient } from '../../../models/ingredient.model'; 
import { Recipe, RecipeService} from '../../../services/recipe.service';
@Component({
  standalone: true,
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgbModule, NgFor],
})
export class RecipesFormComponent {
  recipesForm!: FormGroup;

  allIngredients: Ingredient[] = [];
  selectedIngredients: { name: string; quantity: string }[] = [];
  selectedIngredient: string = '';
  ingredientQuantity: string = '';

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
  }

  openIngredientModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  addIngredient(modal: any) {
    if (
      this.selectedIngredient &&
      this.ingredientQuantity &&
      !this.selectedIngredients.some(
        (ingredient) => ingredient.name === this.selectedIngredient
      )
    ) {
      const ingredient: Ingredient | undefined = this.allIngredients.find(i => i.name === this.selectedIngredient);
      if (ingredient) {
        this.selectedIngredients.push({
          ...ingredient,
          quantity: this.ingredientQuantity
        });
      }
      this.selectedIngredient = '';
      this.ingredientQuantity = '';
    }
    modal.close();
  }

  removeIngredient(index: number) {
    this.selectedIngredients.splice(index, 1);
  }

  addRecipe() {
    if (this.recipesForm.valid) {
      const recipe: Recipe = {
        id: undefined,
        ...this.recipesForm.value,
        ingredients: this.selectedIngredients
      };
      console.log('Enviando receta:', recipe);
      this.recipeService.createRecipe(recipe).subscribe({
        next: (data) => {
          console.log('Receta creada:', data);
          this.selectedIngredients = [];
          this.recipesForm.reset();
        },
        error: (error) => {
          console.error('Error al crear la receta:', error);
        }
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  onSubmit() {
    this.addRecipe();
    console.log('Formulario enviado:', this.recipesForm.value);
  }
}
