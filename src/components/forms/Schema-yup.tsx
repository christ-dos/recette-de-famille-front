import * as yup from "yup";
import { UniteMesureEnum } from "../../models/RecetteIngredient";


const Schema = yup.object({
    title: yup.string()
        .required("Ce champs est requis")
        .min(3, "Entrer au min 3 caracteres ")
        .max(100, "100 caractères maximum"),

    urlPicture: yup.string()
        .required("Ce champs est requis"),

    totalTimePreparation: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .required("Ce champs est requis")
        .max(5, "5 caractères maximum"),

    timePreparation: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .max(5, "5 caractères maximum"),

    cookingTime: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .max(5, "5 caractères maximum"),

    restTime: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .max(5, "5 caractères maximum"),

    stepPreparation: yup.string()
        .required("Ce champs est requis"),

    difficultyLevel: yup.mixed()
        .oneOf(["facile", "intermediaire", "difficile"], "Choisir une option")
        .required("Ce champs est requis"),

    numberOfPeople: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés")
        .max(3, "3 caractères maximum"),

    categorie: yup.mixed()
        .oneOf(["1", "2", "3", "4"], "Choisir une catégorie")
        .required("Ce champs est requis"),

    recettesIngredients: yup.array()
        .of(
            yup.object({
                quantite: yup.string()
                    .required("Ce champs est requis"),
                uniteMesure: yup.mixed()
                    .oneOf(Object.values(UniteMesureEnum)
                        .filter(key => isNaN(Number(key)))
                        .filter(key => key != "map"), 'Ce champs ne peut être vide')
                    .required("Ce champs est requis"),
                ingredient: yup.object({
                    name: yup.string()
                        .required("Ce champs est requis")
                }),

            })
        )
        .default(() => [{ name: 'red', hexCode: '#ff0000' }]),


    /*  quantity: yup.number()
         .required("Ce champs est requis"),
 
     recettesIngredients.0.ingredient.name: yup.string()
         .required("Ce champs est requis"),
 
     uniteMesure: yup.string()
         .required("Ce champs est requis") */

}).required();

export default Schema;
