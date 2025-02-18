import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from '../services/recipe.service';
import { RecipeModel, IngredientModel } from '../models/recipe-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from '../models/ingredient.model';
import { IngredientService } from '../services/ingredients.service';



@Component({
  standalone: true,
  selector: 'app-escanadallo',
  templateUrl: './escanadallo.component.html',
  styleUrl: './escanadallo.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgbModule,]
})
export class EscandalloComponent implements OnInit {
  ingredientes: { recipeName: string, ingredient: Ingredient, calculatedCost: number }[] = [];
  recetas: RecipeModel[] = [];
  totalCost: number = 0;
  escandallosGuardados: any[] = []; // Array para almacenar los escandallos guardados

  constructor(private modalService: NgbModal, private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recetas = recipes;
    });

    this.cargarEscandallosGuardados(); // Cargar escandallos guardados al iniciar
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  agregarRecetasSeleccionadas() {
    this.totalCost = 0;
    const recetasSeleccionadas = this.recetas.filter(receta => receta.seleccionada);
    recetasSeleccionadas.forEach(receta => {
      receta.ingredients.forEach(ingrediente => {
        const mermaMultiplier = (100 - ingrediente.merma) / 100;
        const cantidadEnKg = parseFloat(ingrediente.quantity) / 1000;
        const calculatedCost = cantidadEnKg * ingrediente.precio / mermaMultiplier;
        
        this.ingredientes.push({
          recipeName: receta.name,
          ingredient: ingrediente,
          calculatedCost: calculatedCost
        });
        this.totalCost += calculatedCost;
      });
    });
    console.log('Ingredientes agregados:', this.ingredientes);
    console.log('Costo total:', this.totalCost);
  }

  removeIngrediente(index: number) {
    this.totalCost -= this.ingredientes[index].calculatedCost;
    this.ingredientes.splice(index, 1);
  }

  onSubmit() {
    console.log('Escandallo:', this.ingredientes);
    console.log('Costo total del plato:', this.totalCost);
    this.guardarEscandallo(); // Guardar el escandallo
    alert('Escandallo guardado exitosamente');
  }

  // Método para guardar el escandallo en localStorage
  guardarEscandallo() {
    const escandallo = {
      ingredientes: this.ingredientes,
      totalCost: this.totalCost,
      fecha: new Date().toLocaleString() // Agregar fecha y hora de guardado
    };
    this.escandallosGuardados.push(escandallo);
    localStorage.setItem('escandallos', JSON.stringify(this.escandallosGuardados));
  }

  // Método para cargar los escandallos guardados desde localStorage
  cargarEscandallosGuardados() {
    const escandallos = localStorage.getItem('escandallos');
    if (escandallos) {
      this.escandallosGuardados = JSON.parse(escandallos);
    }
  }

  // Método para abrir el modal de escandallos guardados
  openEscandallosModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // Método para eliminar un escandallo guardado
  eliminarEscandallo(index: number) {
    this.escandallosGuardados.splice(index, 1);
    localStorage.setItem('escandallos', JSON.stringify(this.escandallosGuardados));
  }
}