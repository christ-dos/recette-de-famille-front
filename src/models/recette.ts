import { RecetteIngredient } from "./RecetteIngredient";

   export interface Recette{

    id: number,
    title: string,
    urlPicture: string,
    totalTimePreparation: string,
    timePreparation: string,
    cookingTime: string,
    restTime: string,
    stepPreparation:string,
    difficultyLevel:string,
    numberOfPeople:string,
    recettesIngredients: RecetteIngredient[]
}