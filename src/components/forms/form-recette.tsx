
import { Recette } from "../../models/recette";

export type Field = {
  value: any,
  error?: string,
  isValid?: boolean
}

export type Form = {
  id: Field,

  title: Field,

  urlPicture: Field,

  totalTimePreparation: Field,

  timePreparation: Field,

  cookingTime: Field,

  restTime: Field,

  stepPreparation: Field,

  difficultyLevel: Field,

  numberOfPeople: Field,

  categorie: Field,

  recettesIngredients: Field

}


export function Formulaire(recette: Recette): Form {

  const form =
  {
    id: { value: recette.id, isValid: true },

    title: { value: recette.title, isValid: true },

    urlPicture: { value: recette.urlPicture, isValid: true },

    totalTimePreparation: { value: recette.totalTimePreparation, isValid: true },

    timePreparation: { value: recette.timePreparation, isValid: true },

    cookingTime: { value: recette.cookingTime, isValid: true },

    restTime: { value: recette.restTime, isValid: true },

    stepPreparation: { value: recette.stepPreparation, isValid: true },

    difficultyLevel: { value: recette.difficultyLevel, isValid: true },

    numberOfPeople: { value: recette.numberOfPeople, isValid: true },

    categorie: { value: recette.categorie.id, isValid: true },

    recettesIngredients: { value: recette.recettesIngredients, isValid: true }
  }
  return form;

}

