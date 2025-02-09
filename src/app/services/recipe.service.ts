import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  preparation: string;
  ingredients: Ingredient[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080/recipes'; // URL correcta de JSON Server

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    console.log('Creating recipe:', recipe);
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
