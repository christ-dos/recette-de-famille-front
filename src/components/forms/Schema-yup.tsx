import * as yup from "yup";


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

    difficultyLevel: yup.string(),

    numberOfPeople: yup.string()
        .matches(/^[0-9]*$/, "Uniquement les nombres sont acceptés"),

    categorie: yup.string()
        .required("Ce champs est requis")

    /* quantity: yup.number()
     .required("Ce champs est requis"),
 
     ingredient: yup.string()
     .required("Ce champs est requis"),
 
     uniteMesure: yup.string()
     .uppercase("Ce champs doit être en majuscule")
     .required("Ce champs est requis")*/

}).required();

export default Schema;
