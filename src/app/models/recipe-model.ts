import { Ingredient } from "./ingredient.model";


export interface IngredientModel {
  name: string;
  quantity: string;
  merma: number;
  precio: number;
}

export interface RecipeModel {
  id: number;
  name: string;
  description: string;
  preparation: string;
 ingredients: IngredientModel[]; 
  seleccionada?: boolean; // Añadimos esta propiedad
}
