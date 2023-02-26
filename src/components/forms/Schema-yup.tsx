
import * as yup from "yup";
import { TypeOfShape } from "yup/lib/object";
import { RecettesIngredients, UniteMesureEnum } from "../../models/RecetteIngredient";

declare module "yup" {
    interface ArraySchema<T> {
        unique(
            message: string,
            mapper?: (value: T, index?: number, list?: T[]) => T[]
        ): ArraySchema<T>;
    }
}

yup.addMethod(yup.array, "unique", function (
    message,
    mapper = (val: unknown) => val
) {
    return this.test(
        "unique",
        message,
        (list = []) => list.length === new Set(list.map(mapper)).size
    );
});

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
                        .filter(key => key !== "map"), 'Ce champs ne peut être vide')
                    .required("Ce champs est requis"),
                ingredient: yup.object({
                    name: yup.string()

                        .required("Ce champs est requis")
                        .matches(/^[A-Z  a-z]*$/, "Uniquement les lettes sont acceptés")
                }).required(),

            })
        ).test(
            'unique',
            'Les ingrédients ne peuvent pas être dubliqués',
            (value) => {
                const ingredientNameSet = new Set();
                const ingredientNameValue: (string | undefined)[] = [];
                value?.forEach(element => {
                    console.log(element.ingredient.name);
                    ingredientNameSet.add(element.ingredient.name)
                    ingredientNameValue.push(element.ingredient.name);
                });

                return value ? ingredientNameValue?.length === ingredientNameSet?.size : true;
            }
        )

}).required();



export default Schema;

