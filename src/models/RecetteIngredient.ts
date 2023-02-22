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

export type RecetteIngredientId = {
    recetteId: number,
    ingredientId: number

}

export interface RecettesIngredients {
    id?: RecetteIngredientId,
    quantite: number,
    uniteMesure: UniteMesureEnum,
    ingredient: Ingredient,

}
