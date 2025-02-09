import { Ingredient } from './ingredient.model'; // Asegúrate de que la ruta a ingredient.model sea correcta

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  preparation: string;
  ingredients: Ingredient[];
}
