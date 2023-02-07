import { Categorie } from "./Categorie";
import { recettesIngredients } from "./RecetteIngredient";

   export interface Recette{

    id: number,
    title: string,
    urlPicture: string,
    categorie: Categorie,
    totalTimePreparation: string,
    timePreparation: string,
    cookingTime: string,
    restTime: string,
    stepPreparation:string,
    difficultyLevel:string,
    numberOfPeople:string,
    recettesIngredients: recettesIngredients[]
}