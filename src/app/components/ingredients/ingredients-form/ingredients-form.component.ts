import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { IngredientService } from '../../../services/ingredients.service'; 
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  standalone: true,
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgbModule]
})
export class IngredientsFormComponent {
  ingredientsForm!: FormGroup;

  // Lista para almacenar los ingredientes seleccionados (con cantidad, merma y precio)
  selectedIngredients: Ingredient[] = [];

  // Variables para el modal
  selectedIngredient: string = '';
  ingredientQuantity: string = '';
  ingredientMerma: number | null = null;
  ingredientPrecio: number | null = null;

  // Para editar ingredientes
  editIngredient: any = {};

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private ingredientService: IngredientService // Inyecta el servicio
  ) {
    this.ingredientsForm = this.fb.group({
      name: [''],
      description: [''],
      preparation: [''],
    });
  }

  // Método para abrir el modal de agregar ingrediente
  openIngredientModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // Método para agregar el ingrediente con sus detalles
  addIngredient(modal: any) {
    if (
      this.selectedIngredient &&
      this.ingredientQuantity &&
      this.ingredientMerma != null &&
      this.ingredientPrecio != null
    ) {
      // Añadir el ingrediente con los detalles
      this.selectedIngredients.push({
        name: this.selectedIngredient,
        quantity: this.ingredientQuantity,
        merma: this.ingredientMerma,
        precio: this.ingredientPrecio,
      });

      // Actualizar el servicio con los ingredientes seleccionados
      this.ingredientService.updateIngredients(this.selectedIngredients);

      // Limpiar los campos del modal
      this.selectedIngredient = '';
      this.ingredientQuantity = '';
      this.ingredientMerma = null;
      this.ingredientPrecio = null;

      // Cerrar el modal
      modal.close();
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  // Método para eliminar un ingrediente
  removeIngredient(index: number) {
    this.selectedIngredients.splice(index, 1);
    this.ingredientService.updateIngredients(this.selectedIngredients); // Actualizar el servicio con la lista actualizada
  }

  // Método para abrir el modal de edición de ingrediente
  openEditModal(modal: any, index: number) {
    this.editIngredient = { ...this.selectedIngredients[index] }; // Copia del ingrediente
    this.modalService.open(modal, { centered: true });
  }

  // Método para guardar los cambios de un ingrediente
  saveEdit(modal: any) {
    const index = this.selectedIngredients.findIndex(
      (item) => item.name === this.editIngredient.name
    );
    if (index !== -1) {
      this.selectedIngredients[index] = { ...this.editIngredient };
      this.ingredientService.updateIngredients(this.selectedIngredients); // Actualizar el servicio con los ingredientes editados
    }
    modal.close();
  }

  // Manejar el envío del formulario
  onSubmit() {
    console.log('Receta creada:', this.ingredientsForm.value);
    console.log('Ingredientes:', this.selectedIngredients);
  }
}
