import { Ingredient } from "./Ingredient";
import { Recette } from "./recette";

export enum UniteMesureEnum {
    GRAMME,
    KILOGRAMME,
    LITRE,
    MILILITRE,
    CENTILITRE,
    PIECE,
    CUILLEREASOUPE,
    CUILLEREACAFE, 
    TRANCHE, 
    PINCEE
}

type RecetteIngredientId  = {
    recetteId: number,
    ingredientId: number

}


export interface RecetteIngredient{
    id :RecetteIngredientId,
    quantite: number,
    uniteMesure: UniteMesureEnum,
    ingredient: Ingredient,
    
}
