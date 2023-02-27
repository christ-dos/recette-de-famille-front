import { count } from "console";
import { ChangeEvent } from "react";
import { RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";

/****************** fonction Camelize qui transforme en CamelCase ************************/
export function camelize(titre: string) {
  const tab: string[] = titre.split(" ");
  return tab.map(word => word.replace((word.charAt(0)), () => word.charAt(0).toUpperCase())).join(" ")

}

/****************** fonction qui permet de rechercher par term ************************/
export const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>, setSearchTerm: any) => {
  let value = e.target.value;
  value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
  setSearchTerm("")
}

/*********** fonction qui permet de selecetionner une image et de l'afficher dans le preview ************************/
export const onSelectFile = (e: ChangeEvent<HTMLInputElement>, setSelectedFile: any, setPreview: any, selectedFile: any) => {
        console.log(e.target.files)
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        setPreview(selectedFile);
    }



