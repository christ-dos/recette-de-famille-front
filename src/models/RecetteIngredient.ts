import { Ingredient } from "./Ingredient";


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
    PINCEE,
    map
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
