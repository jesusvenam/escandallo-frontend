import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([]);
  selectedIngredients$ = this.ingredientsSubject.asObservable();

  addIngredient(ingredient: Ingredient): void {
    const currentIngredients = this.ingredientsSubject.value;
    const updatedIngredients = [...currentIngredients, ingredient];
    this.ingredientsSubject.next(updatedIngredients);
  }

  updateIngredients(ingredients: Ingredient[]): void {
    this.ingredientsSubject.next(ingredients);
  }
}
