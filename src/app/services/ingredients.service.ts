import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private selectedIngredientsSubject = new BehaviorSubject<any[]>([]);
  selectedIngredients$ = this.selectedIngredientsSubject.asObservable();

  constructor() {}

  // Método para actualizar los ingredientes
  updateIngredients(ingredients: any[]) {
    this.selectedIngredientsSubject.next(ingredients);
  }

  // Método para obtener los ingredientes actuales
  getIngredients(): any[] {
    return this.selectedIngredientsSubject.getValue();
  }
}


