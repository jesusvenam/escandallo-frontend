import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../models/recipe-model'; // Importa el nuevo modelo

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(this.apiUrl);
  }

  createRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(this.apiUrl, recipe);
  }

  updateRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    return this.http.put<RecipeModel>(`${this.apiUrl}/${recipe.id}`, recipe); // Asegurarse de que la URL es correcta
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}